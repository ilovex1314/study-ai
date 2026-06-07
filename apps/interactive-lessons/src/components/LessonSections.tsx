import { conceptLabels, seriesLessons, type Attempt, type ConceptModule, type DecisionLayer, type LessonPage, type LessonQuestion } from "../data/lessons";
import { buildReview, formatConcepts } from "../lib/review";
import { ArchitectureDiagram } from "./ArchitectureDiagram";

export function Hero({ lesson }: { lesson: LessonPage }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">study-ai / {lesson.phase}</p>
        <h1>
          {lesson.title}：{lesson.hero}
        </h1>
        <p>{lesson.summary}</p>
      </div>
    </section>
  );
}

export function SeriesPanel({ currentLesson, onRoute }: { currentLesson: LessonPage; onRoute: (path: string) => void }) {
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

export function SeriesDock({ currentLesson, onRoute }: { currentLesson: LessonPage; onRoute: (path: string) => void }) {
  return (
    <nav className="series-dock" aria-label="阶段切换">
      {seriesLessons.map((lesson) => (
        <button
          key={lesson.id}
          type="button"
          className={lesson.id === currentLesson.id ? "active" : ""}
          onClick={() => onRoute(lesson.path)}
          aria-current={lesson.id === currentLesson.id ? "page" : undefined}
          aria-label={`切换到 ${lesson.phase}`}
        >
          <span>{lesson.phase}</span>
          <small>{lesson.title.replace(/^Day \\d\\d\\s*/, "")}</small>
        </button>
      ))}
    </nav>
  );
}

export function ConceptsPanel({ lesson, onPractice }: { lesson: LessonPage; onPractice: () => void }) {
  return (
    <section id="concepts" className="section-anchor">
      <div className="section-heading section-title-row">
        <div>
          <p>Concept Modules</p>
          <h2>{lesson.conceptIntro}</h2>
        </div>
        <button type="button" onClick={onPractice}>
          直接做题
        </button>
      </div>
      <div className="section-grid">
        {lesson.modules.map((module) => (
          <ConceptCard key={module.id} module={module} />
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

export function DecisionPanel({ lesson }: { lesson: LessonPage }) {
  return (
    <section id="decision" className="section-panel section-anchor">
      <div className="section-heading">
        <p>Decision Framework</p>
        <h2>{lesson.decisionTitle}</h2>
      </div>
      <div className="decision-intro">
        <p>{lesson.decisionIntro}</p>
      </div>
      <ArchitectureDiagram lesson={lesson} />
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

export function QuizPanel({
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

export function ReviewPanel({
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
