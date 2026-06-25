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
  it("uses numbered question selection and shows the current question weight in content", () => {
    renderApp("/day01/practice");

    expect(screen.getByRole("button", { name: "第 1 题" })).toBeInTheDocument();
    expect(screen.getByText("本题 30 分")).toBeInTheDocument();
  });

  it("updates active module navigation and routes to the current page section", async () => {
    renderApp("/day01/concepts");

    fireEvent.click(routeSteps()[2]);

    expect(routeSteps()[2]).toHaveAttribute("aria-current", "page");
    expect(screen.getByLabelText("current-path")).toHaveTextContent("/day01/decision");
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalled());
    expect(screen.queryByText("跳转")).not.toBeInTheDocument();
  });

  it("renders the module navigation as a fixed section rail", () => {
    renderApp("/day01/concepts");
    expect(screen.getByLabelText("当前页面模块导航")).toHaveClass("section-rail");
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

  it("toggles the desktop course navigation with a stable SVG control", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1280 });
    renderApp("/day01/series");

    const toggle = screen.getByRole("button", { name: "收起课程目录" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle.querySelector("svg")).toBeInTheDocument();

    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: "展开课程目录" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "展开课程目录" }).querySelector(".series-dock-menu-icon")).toBeInTheDocument();
  });

  it("uses document order for the menu day label and keeps the title free of a duplicated day prefix", () => {
    renderApp("/day01/series");

    const dayOne = screen.getByRole("button", { name: "切换到 Day01" });
    expect(dayOne).toHaveTextContent("Day01");
    expect(dayOne).toHaveTextContent("AI 产品问题与模型边界");
    expect(seriesLessons[0].title).toBe("AI 产品问题与模型边界");
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

    fireEvent.click(screen.getByRole("button", { name: /Day02 Prompt/ }));

    await waitFor(() => expect(screen.getAllByText("Prompt / RAG / Grounding", { exact: false }).length).toBeGreaterThan(0));
    expect(screen.getAllByText(/RAG/).length).toBeGreaterThan(0);
  });

  it("normalizes invalid routes back to the first lesson", () => {
    renderApp("/planned");

    expect(screen.getByRole("heading", { level: 1, name: /把模型输出变成可控的产品行为/ })).toBeInTheDocument();
  });

  it("keeps Day01-Day20 continuous and renders architectural learning aids", () => {
    renderApp("/day01/decision");

    expect(seriesLessons.map((lesson) => lesson.phase)).toEqual([
      "Day01",
      "Day02",
      "Day03",
      "Day04",
      "Day05",
      "Day06",
      "Day07",
      "Day08",
      "Day09",
      "Day10",
      "Day11",
      "Day12",
      "Day13",
      "Day14",
      "Day15",
      "Day16",
      "Day17",
      "Day18",
      "Day19",
      "Day20"
    ]);
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/例子|案例|Production/i).length).toBeGreaterThan(0);
  });

  it("renders a distinct architecture diagram for each learning phase", () => {
    const day01 = renderApp("/day01/decision");
    expect(screen.getByRole("img", { name: "模型建议与系统控制边界" })).toHaveAttribute("data-type", "boundary");
    day01.unmount();

    const day02 = renderApp("/day02/decision");
    expect(screen.getByRole("img", { name: "从知识入库到带引用回答" })).toHaveAttribute("data-type", "lifecycle");
    day02.unmount();

    const day03 = renderApp("/day03/decision");
    expect(screen.getByRole("img", { name: "可暂停的 Agent 执行状态" })).toHaveAttribute("data-type", "state");
    day03.unmount();

    const day04 = renderApp("/day04/decision");
    expect(screen.getByRole("img", { name: "AI 产品交付分层" })).toHaveAttribute("data-type", "layered");
    day04.unmount();

    renderApp("/day13/decision");
    expect(screen.getByRole("img", { name: "设计数据到可验证界面闭环" })).toHaveAttribute("data-type", "feedback");
    expect(screen.getByText("验收发现的问题回流为新的设计约束。")).toBeInTheDocument();
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

  it("renders an authored relationship diagram with its conclusion", () => {
    renderApp("/day14/concepts");

    expect(screen.getByText("metadata 把知识源、派生资产、权限和引用连接成可追踪生命周期。")).toBeInTheDocument();
    expect(document.querySelector(".concept-diagram")?.textContent).toContain("Metadata");
  });

  it("does not render a generic visual placeholder for a module without a diagram", () => {
    renderApp("/day14/concepts");

    expect(document.querySelectorAll(".concept-diagram").length).toBeGreaterThan(0);
    expect(document.querySelectorAll(".schema-visual, .machine-visual, .tools-visual")).toHaveLength(0);
  });
});
