import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  conceptLabels,
  lessons,
  seriesLessons,
  type Attempt,
  type ConceptModule,
  type CurrentAttempt,
  type DecisionLayer,
  type LessonPage,
  type LessonQuestion
} from "./data/day01";
import { buildReview, createCompletedAttempt, formatConcepts } from "./lib/review";
import {
  clearAttemptHistory,
  completeCurrentAttempt,
  createCurrentAttempt,
  deleteAttempt,
  exportAttemptHistory,
  loadAttemptHistory,
  loadCurrentAttempt,
  resetCurrentAttempt,
  saveCurrentAttempt
} from "./lib/storage";

const sections = [
  { id: "series", label: "系列入口" },
  { id: "concepts", label: "概念讲解" },
  { id: "decision", label: "决策框架" },
  { id: "practice", label: "做题练习" },
  { id: "review", label: "复盘记录" }
];

const sectionIds = sections.map((section) => section.id);

function getInitialAttempt(lessonId: string): CurrentAttempt {
  const existing = loadCurrentAttempt(lessonId);
  if (existing) {
    return existing;
  }

  const created = createCurrentAttempt();
  saveCurrentAttempt(created, lessonId);
  return created;
}

function scrollToElement(id: string, behavior: ScrollBehavior) {
  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top: Math.max(top, 0), behavior });
}

function getViewportSection() {
  const activationLine = Math.min(180, window.innerHeight * 0.28);
  let active = sectionIds[0];

  for (const id of sectionIds) {
    const target = document.getElementById(id);
    if (!target) {
      continue;
    }

    const rect = target.getBoundingClientRect();
    if (rect.top <= activationLine && rect.bottom > 0) {
      active = id;
    }
  }

  return active;
}

function getSectionFromRoute(sectionId?: string) {
  return sectionId && sectionIds.includes(sectionId) ? sectionId : "series";
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/day01/series" replace />} />
      <Route path="/:dayId/:sectionId?" element={<LessonRoute />} />
      <Route path="*" element={<Navigate to="/day01/series" replace />} />
    </Routes>
  );
}

function LessonRoute() {
  const { dayId, sectionId } = useParams();
  const lesson = lessons.find((item) => item.id === dayId);

  if (!lesson) {
    return <Navigate to="/day01/series" replace />;
  }

  if (sectionId && !sectionIds.includes(sectionId)) {
    return <Navigate to={`${lesson.path}/series`} replace />;
  }

  return <LessonPageView lesson={lesson} routeSection={getSectionFromRoute(sectionId)} />;
}

function LessonPageView({ lesson, routeSection }: { lesson: LessonPage; routeSection: string }) {
  const navigate = useNavigate();
  const suppressScrollSyncUntil = useRef(0);
  const [activeSection, setActiveSection] = useState(routeSection);
  const [current, setCurrent] = useState<CurrentAttempt>(() => getInitialAttempt(lesson.id));
  const [history, setHistory] = useState<Attempt[]>(() => loadAttemptHistory(lesson.id));
  const [activeQuestion, setActiveQuestion] = useState(0);

  function suppressScrollSync(duration = 800) {
    suppressScrollSyncUntil.current = Date.now() + duration;
  }

  useEffect(() => {
    setActiveSection(routeSection);
    setCurrent(getInitialAttempt(lesson.id));
    setHistory(loadAttemptHistory(lesson.id));
    setActiveQuestion(0);

    if (routeSection === "series") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      suppressScrollSync();
      window.setTimeout(() => scrollToElement(routeSection, "auto"), 0);
    }
  }, [lesson.id, routeSection]);

  useEffect(() => {
    let frame = 0;

    function syncActiveSectionFromScroll() {
      frame = 0;
      if (Date.now() < suppressScrollSyncUntil.current) {
        return;
      }

      const nextSection = getViewportSection();
      setActiveSection((currentSection) => {
        if (currentSection === nextSection) {
          return currentSection;
        }

        navigate(`${lesson.path}/${nextSection}`, { replace: true });
        return nextSection;
      });
    }

    function scheduleSync() {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(syncActiveSectionFromScroll);
    }

    window.addEventListener("scroll", scheduleSync, { passive: true });
    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", scheduleSync);
    };
  }, [lesson.path, navigate]);

  const review = useMemo(() => buildReview(lesson.questions, current.answers), [lesson.questions, current.answers]);
  const answeredCount = Object.keys(current.answers).length;
  const progress = Math.round((answeredCount / lesson.questions.length) * 100);
  const allAnswered = answeredCount === lesson.questions.length;

  function scrollToSection(id: string) {
    suppressScrollSync();
    setActiveSection(id);
    navigate(`${lesson.path}/${id}`);
    window.setTimeout(() => scrollToElement(id, "smooth"), 0);
  }

  function answerQuestion(question: LessonQuestion, optionId: string) {
    const next = {
      ...current,
      answers: {
        ...current.answers,
        [question.id]: optionId
      }
    };
    setCurrent(next);
    saveCurrentAttempt(next, lesson.id);
  }

  function completeAttempt() {
    if (!allAnswered) {
      return;
    }

    const completed = createCompletedAttempt(current, lesson.questions);
    completeCurrentAttempt(completed, lesson.id);
    setHistory(loadAttemptHistory(lesson.id));
  }

  function retry() {
    const next = createCurrentAttempt();
    saveCurrentAttempt(next, lesson.id);
    setCurrent(next);
    setActiveQuestion(0);
    scrollToSection("practice");
  }

  function resetProgress() {
    resetCurrentAttempt(lesson.id);
    retry();
  }

  function removeAttempt(id: string) {
    deleteAttempt(id, lesson.id);
    setHistory(loadAttemptHistory(lesson.id));
  }

  function clearHistory() {
    clearAttemptHistory(lesson.id);
    setHistory([]);
  }

  function exportHistory() {
    const blob = new Blob([exportAttemptHistory(lesson.id)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `study-ai-${lesson.id}-attempt-history.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app-shell">
      <Hero lesson={lesson} progress={progress} answeredCount={answeredCount} />
      <nav className="route-strip" aria-label="当前页面模块导航">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={activeSection === section.id ? "route-step active" : "route-step"}
            onClick={() => scrollToSection(section.id)}
            aria-current={activeSection === section.id ? "page" : undefined}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <SeriesPanel currentLesson={lesson} onRoute={(path) => navigate(`${path}/series`)} />

      <section id="concepts" className="section-anchor">
        <div className="section-heading section-title-row">
          <div>
            <p>Concept Modules</p>
            <h2>{lesson.conceptIntro}</h2>
          </div>
          <button type="button" onClick={() => scrollToSection("practice")}>
            直接做题
          </button>
        </div>
        <div className="section-grid">
          {lesson.modules.map((module) => (
            <ConceptCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      <DecisionPanel lesson={lesson} />

      <section id="practice" className="learning-workbench section-anchor">
        <QuizPanel
          lesson={lesson}
          activeQuestion={activeQuestion}
          answers={current.answers}
          onAnswer={answerQuestion}
          onNext={() => setActiveQuestion((value) => Math.min(value + 1, lesson.questions.length - 1))}
          onPrev={() => setActiveQuestion((value) => Math.max(value - 1, 0))}
        />
        <ReviewPanel
          lesson={lesson}
          allAnswered={allAnswered}
          history={history}
          review={review}
          onComplete={completeAttempt}
          onRetry={retry}
          onReset={resetProgress}
          onDelete={removeAttempt}
          onClearHistory={clearHistory}
          onExport={exportHistory}
        />
      </section>
    </main>
  );
}

function Hero({ lesson, progress, answeredCount }: { lesson: LessonPage; progress: number; answeredCount: number }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">study-ai / {lesson.phase}</p>
        <h1>
          {lesson.title}：{lesson.hero}
        </h1>
        <p>{lesson.summary}</p>
      </div>
      <div className="hero-meter" aria-label="学习进度">
        <div className="meter-ring" style={{ "--progress": `${progress}%` } as React.CSSProperties}>
          <strong>{progress}%</strong>
          <span>
            {answeredCount}/{lesson.questions.length} 题
          </span>
        </div>
        <p>系列入口切换页面；当前页面导航只滚动到本页模块，并同步 active 状态。</p>
      </div>
    </section>
  );
}

function SeriesPanel({ currentLesson, onRoute }: { currentLesson: LessonPage; onRoute: (path: string) => void }) {
  return (
    <section id="series" className="series-panel section-anchor">
      <div className="section-heading">
        <p>Learning Series</p>
        <h2>统一入口：每个阶段是独立学习页面</h2>
      </div>
      <div className="series-grid">
        {seriesLessons.map((lesson) => (
          <button
            key={lesson.id}
            type="button"
            className={lesson.id === currentLesson.id ? "series-card current" : "series-card"}
            onClick={() => onRoute(lesson.path)}
            aria-current={lesson.id === currentLesson.id ? "page" : undefined}
          >
            <span>{lesson.phase}</span>
            <strong>{lesson.title}</strong>
            <p>{lesson.summary}</p>
            <small>{lesson.id === currentLesson.id ? "当前页面" : "进入页面"}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function ConceptCard({ module }: { module: ConceptModule }) {
  return (
    <article className="concept-card">
      <div className="concept-copy">
        <p>{module.eyebrow}</p>
        <h2>{module.title}</h2>
        <span>{conceptLabels[module.concept]}</span>
        <p>{module.summary}</p>
      </div>
      <ConceptVisual kind={module.visual} />
      <div className="concept-detail">
        <h3>为什么重要</h3>
        <p>{module.whyItMatters}</p>
        <h3>核心知识</h3>
        <ul>
          {module.coreIdeas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
        <h3>工程视角</h3>
        <p>{module.engineerLens}</p>
        {module.fieldExample ? (
          <>
            <h3>一线例子</h3>
            <p>{module.fieldExample}</p>
          </>
        ) : null}
        <h3>常见误区</h3>
        <ul>
          {module.pitfalls.map((pitfall) => (
            <li key={pitfall}>{pitfall}</li>
          ))}
        </ul>
        <div className="practice-prompt">
          <strong>练习提示</strong>
          <p>{module.practicePrompt}</p>
        </div>
        {module.source ? (
          <a className="source-link" href={module.source.url} target="_blank" rel="noreferrer">
            {module.source.label}
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ConceptVisual({ kind }: { kind: ConceptModule["visual"] }) {
  if (kind === "machine") {
    return (
      <div className="visual machine-visual">
        <div>Input</div>
        <span>确定逻辑</span>
        <div>Output</div>
        <strong>vs</strong>
        <div>Context</div>
        <span>概率分布</span>
        <div>Sampled Output</div>
      </div>
    );
  }

  if (kind === "budget") {
    return (
      <div className="visual budget-visual">
        <span style={{ height: "38%" }} />
        <span style={{ height: "64%" }} />
        <span style={{ height: "82%" }} />
        <b>成本 / 延迟 / 注意力</b>
      </div>
    );
  }

  if (kind === "workbench") {
    return (
      <div className="visual workbench-visual">
        <span>本次任务</span>
        <span>相关资料</span>
        <span>输出约束</span>
        <i>窗口外的信息不可见</i>
      </div>
    );
  }

  if (kind === "dial") {
    return (
      <div className="visual dial-visual">
        <div className="dial" />
        <p>稳定 ← temperature → 发散</p>
      </div>
    );
  }

  if (kind === "schema") {
    return (
      <div className="visual schema-visual">
        <code>{"{ intent, confidence, entities }"}</code>
        <span>parse</span>
        <span>validate</span>
        <span>fallback</span>
      </div>
    );
  }

  return (
    <div className="visual tools-visual">
      <span>Model decides</span>
      <b>tool(args)</b>
      <span>System executes</span>
      <small>auth + log + rollback</small>
    </div>
  );
}

function DecisionPanel({ lesson }: { lesson: LessonPage }) {
  return (
    <section id="decision" className="section-panel section-anchor">
      <div className="section-heading">
        <p>Decision Framework</p>
        <h2>{lesson.decisionTitle}</h2>
      </div>
      <div className="decision-intro">
        <p>{lesson.decisionIntro}</p>
      </div>
      <ArchitectureDiagram layers={lesson.decisionLayers} />
      <div className="layer-grid">
        {lesson.decisionLayers.map((layer) => (
          <DecisionLayerCard key={layer.id} layer={layer} />
        ))}
      </div>
      {lesson.decisionExample ? (
        <div className="field-example">
          <h3>一线例子</h3>
          <p>{lesson.decisionExample}</p>
        </div>
      ) : null}
    </section>
  );
}

function ArchitectureDiagram({ layers }: { layers: DecisionLayer[] }) {
  const knowledgeLayer = layers.find((layer) => layer.id === "knowledge");
  const executionLayer = layers.find((layer) => layer.id === "execution");

  return (
    <div className="architecture-diagram" aria-label="AI 应用工程架构图">
      <div className="diagram-heading">
        <span>AI 应用工程架构图</span>
        <small>参考 OpenAI Agents / Evals 与 Anthropic Workflow-Agent 区分</small>
      </div>
      <div className="architecture-canvas">
        <div className="arch-node entry">
          <strong>入口层</strong>
          <span>Chat UI / 表单 / 后台任务 / Webhook</span>
          <small>负责收集用户意图，不负责最终业务决策。</small>
        </div>
        <div className="arch-node orchestration">
          <strong>编排控制层</strong>
          <span>Workflow / Router / Agent / Handoff</span>
          <small>固定流程优先 Workflow；路径无法预设、需要动态选择工具时才升级为 Agent。</small>
        </div>
        <div className="arch-node context">
          <strong>上下文与知识层</strong>
          <span>{knowledgeLayer?.choices.map((choice) => choice.name).join(" / ")}</span>
          <small>RAG、记忆、实时查询把必要事实放进本轮上下文。</small>
        </div>
        <div className="arch-node model">
          <strong>模型能力层</strong>
          <span>Instructions / Model / Structured Output</span>
          <small>模型负责语义理解、推理、生成和工具调用意图。</small>
        </div>
        <div className="arch-node tools">
          <strong>工具与动作层</strong>
          <span>{executionLayer?.choices.map((choice) => choice.name).join(" / ")}</span>
          <small>API、数据库、代码和状态机负责真实动作、权限和可审计结果。</small>
        </div>
        <div className="arch-node safety">
          <strong>安全与治理层</strong>
          <span>Guardrails / Auth / Policy / Human Review</span>
          <small>输入输出、工具调用和高风险动作都需要分层防护。</small>
        </div>
        <div className="arch-node evals">
          <strong>评估与反馈层</strong>
          <span>Logs / Evals / Tracing / Metrics</span>
          <small>用生产日志和任务评估集检查答案质量、工具参数、路由和交接边界。</small>
        </div>
        <div className="arch-arrow arrow-a" aria-hidden="true">→</div>
        <div className="arch-arrow arrow-b" aria-hidden="true">→</div>
        <div className="arch-arrow arrow-c" aria-hidden="true">→</div>
        <div className="arch-arrow arrow-d" aria-hidden="true">→</div>
        <div className="arch-arrow arrow-e" aria-hidden="true">↘</div>
        <div className="arch-arrow arrow-f" aria-hidden="true">↻</div>
      </div>
    </div>
  );
}

function DecisionLayerCard({ layer }: { layer: DecisionLayer }) {
  return (
    <article className="layer-card">
      <div className="solution-top">
        <span>{layer.name}</span>
        <small>{layer.question}</small>
      </div>
      <div className="choice-list">
        {layer.choices.map((choice) => (
          <div key={choice.name} className="choice-card">
            <strong>{choice.name}</strong>
            <p>{choice.description}</p>
            <small>{choice.example}</small>
          </div>
        ))}
      </div>
    </article>
  );
}

function QuizPanel({
  lesson,
  activeQuestion,
  answers,
  onAnswer,
  onNext,
  onPrev
}: {
  lesson: LessonPage;
  activeQuestion: number;
  answers: Record<string, string>;
  onAnswer: (question: LessonQuestion, optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const question = lesson.questions[activeQuestion];
  const selected = answers[question.id];
  const selectedOption = question.options.find((option) => option.id === selected);

  return (
    <section className="quiz-panel">
      <div className="section-heading compact">
        <p>Practice</p>
        <h2>通过做题完成学习</h2>
      </div>
      <div className="question-meta">
        <span>
          {activeQuestion + 1} / {lesson.questions.length}
        </span>
        <span>{conceptLabels[question.concept]}</span>
      </div>
      {question.scenario ? <p className="scenario">{question.scenario}</p> : null}
      <h3>{question.prompt}</h3>
      <div className="option-list">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const revealed = Boolean(selected);
          return (
            <button
              key={option.id}
              type="button"
              className={[
                "option-button",
                isSelected ? "selected" : "",
                revealed && option.correct ? "correct" : "",
                revealed && isSelected && !option.correct ? "wrong" : ""
              ].join(" ")}
              onClick={() => onAnswer(question, option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {selectedOption ? (
        <div className={selectedOption.correct ? "feedback correct" : "feedback wrong"}>
          <strong>{selectedOption.correct ? "判断正确" : "这里容易误判"}</strong>
          <p>{question.explanation}</p>
        </div>
      ) : null}
      <div className="quiz-actions">
        <button type="button" onClick={onPrev}>
          上一题
        </button>
        <button type="button" onClick={onNext}>
          下一题
        </button>
      </div>
    </section>
  );
}

function ReviewPanel({
  lesson,
  allAnswered,
  history,
  review,
  onComplete,
  onRetry,
  onReset,
  onDelete,
  onClearHistory,
  onExport
}: {
  lesson: LessonPage;
  allAnswered: boolean;
  history: Attempt[];
  review: ReturnType<typeof buildReview>;
  onComplete: () => void;
  onRetry: () => void;
  onReset: () => void;
  onDelete: (id: string) => void;
  onClearHistory: () => void;
  onExport: () => void;
}) {
  const best = history.reduce((max, attempt) => Math.max(max, attempt.score), 0);

  return (
    <aside id="review" className="review-panel section-anchor">
      <div className="section-heading compact">
        <p>Review</p>
        <h2>学习效果和后续加强</h2>
      </div>
      <div className="score-card">
        <span>当前得分</span>
        <strong>
          {review.score}/{review.total}
        </strong>
        <p>{review.weakConcepts.length > 0 ? `薄弱点：${formatConcepts(review.weakConcepts)}` : "当前没有明显薄弱点"}</p>
      </div>
      <div className="recommendation-list">
        {review.recommendations.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <div className="review-actions">
        <button type="button" disabled={!allAnswered} onClick={onComplete}>
          完成本轮
        </button>
        <button type="button" onClick={onRetry}>
          重新做题
        </button>
        <button type="button" onClick={onReset}>
          重置当前
        </button>
        <button type="button" onClick={onExport} disabled={history.length === 0}>
          导出历史
        </button>
      </div>
      <div className="history-head">
        <span>历史记录</span>
        <small>
          最好 {best}/{lesson.questions.length}
        </small>
      </div>
      <div className="history-list">
        {history.length === 0 ? (
          <p className="empty">完成一轮后，这里会保存当前页面的学习记录。</p>
        ) : (
          history.map((attempt) => (
            <article key={attempt.id} className="history-item">
              <div>
                <strong>
                  {attempt.score}/{attempt.total}
                </strong>
                <span>{new Date(attempt.completedAt).toLocaleString()}</span>
                <small>{attempt.weakConcepts.length ? formatConcepts(attempt.weakConcepts) : "掌握稳定"}</small>
              </div>
              <button type="button" onClick={() => onDelete(attempt.id)}>
                删除
              </button>
            </article>
          ))
        )}
      </div>
      <button className="clear-button" type="button" onClick={onClearHistory} disabled={history.length === 0}>
        清空全部历史
      </button>
    </aside>
  );
}
