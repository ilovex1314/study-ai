import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { lessons, seriesLessons } from "./data/lessons";

function LocationProbe() {
  const location = useLocation();
  return <output aria-label="current-path">{location.pathname}</output>;
}

function renderApp(path = "/day01/series") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>
  );
}

function routeSteps() {
  return screen.getAllByRole("button").filter((button) => button.className.includes("route-step"));
}

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  Element.prototype.scrollIntoView = vi.fn();
  window.scrollTo = vi.fn();
  window.requestAnimationFrame = (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  };
  window.cancelAnimationFrame = vi.fn();
});

describe("App navigation", () => {
  it("updates active module navigation and routes to the current page section", async () => {
    renderApp("/day01/concepts");

    fireEvent.click(routeSteps()[2]);

    expect(routeSteps()[2]).toHaveAttribute("aria-current", "page");
    expect(screen.getByLabelText("current-path")).toHaveTextContent("/day01/decision");
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalled());
    expect(screen.queryByText("跳转")).not.toBeInTheDocument();
  });

  it("initializes active module navigation from direct section routes", async () => {
    renderApp("/day01/decision");

    expect(routeSteps()[2]).toHaveAttribute("aria-current", "page");
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalled());
  });

  it("supports collapsing and expanding the compact module navigation", () => {
    renderApp("/day01/series");

    const toggle = screen.getByRole("button", { name: "模块导航：系列入口" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps active module navigation synced with the scrolled viewport", async () => {
    renderApp();

    const originalGetElementById = document.getElementById.bind(document);
    vi.spyOn(document, "getElementById").mockImplementation((id) => {
      const element = originalGetElementById(id);
      if (!element) return element;

      const positions: Record<string, { top: number; bottom: number }> = {
        series: { top: -1200, bottom: -700 },
        concepts: { top: -620, bottom: -120 },
        decision: { top: 80, bottom: 680 },
        practice: { top: 760, bottom: 1300 },
        review: { top: 1360, bottom: 1800 }
      };

      if (id in positions) {
        element.getBoundingClientRect = () => positions[id] as DOMRect;
      }

      return element;
    });

    fireEvent.scroll(window);

    await waitFor(() => expect(routeSteps()[2]).toHaveAttribute("aria-current", "page"));
  });

  it("does not let programmatic tab scrolling revert the selected route", async () => {
    renderApp("/day01/concepts");

    const originalGetElementById = document.getElementById.bind(document);
    vi.spyOn(document, "getElementById").mockImplementation((id) => {
      const element = originalGetElementById(id);
      if (!element) return element;

      const positions: Record<string, { top: number; bottom: number }> = {
        series: { top: -1200, bottom: -700 },
        concepts: { top: 80, bottom: 680 },
        decision: { top: 760, bottom: 1300 },
        practice: { top: 1360, bottom: 1800 },
        review: { top: 1900, bottom: 2300 }
      };

      if (id in positions) {
        element.getBoundingClientRect = () => positions[id] as DOMRect;
      }

      return element;
    });

    fireEvent.click(routeSteps()[2]);
    fireEvent.scroll(window);

    await waitFor(() => expect(screen.getByLabelText("current-path")).toHaveTextContent("/day01/decision"));
    expect(routeSteps()[2]).toHaveAttribute("aria-current", "page");
  });

  it("routes series cards to independent lesson pages", async () => {
    renderApp();

    fireEvent.click(screen.getByRole("button", { name: /Day 02 Prompt/ }));

    await waitFor(() => expect(screen.getByRole("heading", { name: /Day 02 Prompt/ })).toBeInTheDocument());
    expect(screen.getAllByText(/RAG/).length).toBeGreaterThan(0);
  });

  it("normalizes invalid routes back to the first lesson", () => {
    renderApp("/planned");

    expect(screen.getByRole("heading", { name: /Day 01/ })).toBeInTheDocument();
  });

  it("keeps Day01-Day04 continuous and renders architectural learning aids", () => {
    renderApp("/day01/decision");

    expect(seriesLessons.map((lesson) => lesson.phase)).toEqual(["Day01", "Day02", "Day03", "Day04"]);
    expect(screen.getByLabelText(/AI/)).toBeInTheDocument();
    expect(screen.getAllByText(/例子|案例|Production/i).length).toBeGreaterThan(0);
  });

  it("renders a distinct architecture diagram for each learning phase", () => {
    const day01 = renderApp("/day01/decision");
    expect(screen.getByRole("img", { name: "模型能力与系统控制边界" })).toBeInTheDocument();
    expect(screen.getByText("业务状态机")).toBeInTheDocument();
    day01.unmount();

    const day02 = renderApp("/day02/decision");
    expect(screen.getByRole("img", { name: "RAG 离线入库与在线检索生成" })).toBeInTheDocument();
    expect(screen.getByText("离线入库链路")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "模型能力与系统控制边界" })).not.toBeInTheDocument();
    day02.unmount();

    const day03 = renderApp("/day03/decision");
    expect(screen.getByRole("img", { name: "Agent loop 与工具执行控制" })).toBeInTheDocument();
    expect(screen.getByText("Planner / LLM")).toBeInTheDocument();
    day03.unmount();

    renderApp("/day04/decision");
    expect(screen.getByRole("img", { name: "AI 产品化交付分层架构" })).toBeInTheDocument();
    expect(screen.getAllByText("模型网关").length).toBeGreaterThan(0);
    expect(screen.getByText("质量与运维闭环")).toBeInTheDocument();
  });

  it("keeps every quiz concept covered by its lesson modules", () => {
    for (const lesson of lessons) {
      const concepts = new Set(lesson.modules.map((module) => module.concept));
      expect(lesson.questions.length).toBeGreaterThanOrEqual(4);
      for (const question of lesson.questions) {
        expect(concepts.has(question.concept)).toBe(true);
      }
    }
  });

  it("keeps temperature as a first-class Day 01 concept", () => {
    const day01 = lessons.find((lesson) => lesson.id === "day01");

    expect(day01?.modules.some((module) => module.concept === "temperature")).toBe(true);
  });
});
