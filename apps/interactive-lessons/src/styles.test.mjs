import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");

describe("course directory positioning", () => {
  it("keeps fixed menu controls without reserving desktop space when collapsed", () => {
    const contract = stylesheet.slice(stylesheet.indexOf("/* Fixed course directory contract. */"));

    expect(contract).toContain("position: fixed !important");
    expect(contract).toContain(".app-shell:has(.series-dock.open)");
    expect(contract).toContain(".app-shell:has(.series-dock.open) { padding-bottom: 148px !important; }");
    expect(contract).toContain(".app-shell { padding-left: 32px !important; }");
    expect(contract).toContain(".series-dock:not(.open) .series-dock-toggle:hover .series-dock-chevron");
    expect(contract).toMatch(/\.series-dock:not\(\.open\)\s*\{\s*inset: auto auto 16px 16px !important;/);
    expect(contract).toContain("height: 44px !important;");
    expect(contract).toMatch(/\.series-dock:not\(\.open\)\s*\{\s*inset: auto auto 16px 16px !important;/);
    expect(contract).toContain(".series-dock.open .series-dock-toggle { position: absolute !important;");
  });
});

describe("desktop section rail", () => {
  it("keeps a clicked-open menu expanded after the toggle loses focus", () => {
    const contract = stylesheet.slice(stylesheet.indexOf("/* FINAL: fixed-navigation-behavior.html"));

    expect(contract).toContain(".section-rail:hover, .section-rail:focus-within, .section-rail.open { right: 0 !important; width: 154px !important; height: auto !important; padding: 8px 0 !important; }");
    expect(contract).toContain(".section-rail .route-toggle { left: 0 !important; right: auto !important; border-left: 0 !important; border-right: 0 !important; }");
    expect(contract).toContain(".section-rail.open .route-step { opacity: 1 !important; }");
  });
});

describe("desktop reading width", () => {
  it("keeps the lesson shell between the requested minimum and maximum widths", () => {
    const contract = stylesheet.slice(stylesheet.indexOf("/* FINAL: fixed-navigation-behavior.html"));

    expect(contract).toContain(".app-shell { width: min(1440px, calc(100% - 36px)) !important; min-width: 960px !important; padding: 48px 0 112px !important; }");
  });
});
