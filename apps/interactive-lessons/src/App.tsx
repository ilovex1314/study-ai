import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ConceptsPanel, DecisionPanel, Hero, QuizPanel, ReviewPanel, SeriesDock, SeriesPanel } from "./components/LessonSections";
import {
  lessons,
  type Attempt,
  type CurrentAttempt,
  type LessonPage,
  type LessonQuestion
} from "./data/lessons";
import { buildReview, createCompletedAttempt } from "./lib/review";
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
  const [moduleNavOpen, setModuleNavOpen] = useState(false);

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
  const allAnswered = answeredCount === lesson.questions.length;

  function scrollToSection(id: string) {
    suppressScrollSync();
    setActiveSection(id);
    setModuleNavOpen(false);
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
      <Hero lesson={lesson} />
      <nav className={moduleNavOpen ? "route-strip open" : "route-strip"} aria-label="当前页面模块导航">
        <button
          className="route-toggle"
          type="button"
          onClick={() => setModuleNavOpen((open) => !open)}
          aria-expanded={moduleNavOpen}
          aria-label={`模块导航：${sections.find((section) => section.id === activeSection)?.label ?? "页面模块"}`}
        >
          {sections.find((section) => section.id === activeSection)?.label ?? "页面模块"}
        </button>
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
      <SeriesDock currentLesson={lesson} onRoute={(path) => navigate(`${path}/series`)} />

      <ConceptsPanel lesson={lesson} onPractice={() => scrollToSection("practice")} />

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
