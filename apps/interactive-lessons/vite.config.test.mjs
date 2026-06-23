import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("Vite deployment paths", () => {
  it("uses root-relative asset URLs so deep links can load their bundles", async () => {
    const config = await readFile("vite.config.ts", "utf8");

    expect(config).toMatch(/base:\s*"\/"/);
  });
});
