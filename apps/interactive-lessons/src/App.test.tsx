import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { lessons, seriesLessons } from "./data/day01";

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

    const routeSteps = screen.getAllByRole("button").filter((button) => button.className.includes("route-step"));
    fireEvent.click(routeSteps[2]);

    expect(routeSteps[2]).toHaveAttribute("aria-current", "page");
    expect(screen.getByLabelText("current-path")).toHaveTextContent("/day01/decision");
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalled());
    expect(screen.queryByText("跳转")).not.toBeInTheDocument();
  });

  it("initializes active module navigation from direct section routes", async () => {
    renderApp("/day01/decision");

    expect(document.querySelectorAll(".route-step")[2]).toHaveAttribute("aria-current", "page");
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalled());
  });

  it("keeps active module navigation synced with the scrolled viewport", async () => {
    renderApp();

    const originalGetElementById = document.getElementById.bind(document);
    vi.spyOn(document, "getElementById").mockImplementation((id) => {
      const element = originalGetElementById(id);
      if (!element) {
        return element;
      }

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

    await waitFor(() => expect(document.querySelectorAll(".route-step")[2]).toHaveAttribute("aria-current", "page"));
  });

  it("does not let programmatic tab scrolling revert the selected route", async () => {
    renderApp("/day01/concepts");

    const originalGetElementById = document.getElementById.bind(document);
    vi.spyOn(document, "getElementById").mockImplementation((id) => {
      const element = originalGetElementById(id);
      if (!element) {
        return element;
      }

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

    const routeSteps = screen.getAllByRole("button").filter((button) => button.className.includes("route-step"));
    fireEvent.click(routeSteps[2]);
    fireEvent.scroll(window);

    await waitFor(() => expect(screen.getByLabelText("current-path")).toHaveTextContent("/day01/decision"));
    expect(routeSteps[2]).toHaveAttribute("aria-current", "page");
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

  it("keeps series phases continuous and renders architectural learning aids", () => {
    renderApp("/day01/decision");

    expect(seriesLessons.map((lesson) => lesson.phase)).toEqual(["阶段 1", "阶段 2", "阶段 3", "阶段 4"]);
    expect(screen.getByLabelText("AI 应用工程架构图")).toBeInTheDocument();
    expect(screen.getByText("安全与治理层")).toBeInTheDocument();
    expect(screen.getByText("评估与反馈层")).toBeInTheDocument();
    expect(screen.getAllByText("一线例子").length).toBeGreaterThan(0);
  });

  it("keeps temperature as a first-class Day 01 concept", () => {
    const day01 = lessons.find((lesson) => lesson.id === "day01");

    expect(day01?.modules.some((module) => module.concept === "temperature")).toBe(true);
  });
});
