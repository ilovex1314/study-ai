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
