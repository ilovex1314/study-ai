import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const publicDir = resolve(process.cwd(), "public");
const shareImage = "https://study-ai.pages.dev/seo-card.png";

describe("SEO metadata", () => {
  it("describes the project for search and social sharing", () => {
    expect(html).toContain("<title>study-ai | happyboy 的 AI 学习项目</title>");
    expect(html).toContain('name="description" content="happyboy 的学习项目，AI 学习项目"');
    expect(html).toContain('name="keywords" content="happyboy 的学习项目, AI 学习项目, study-ai, AI 学习, AI 工程学习"');
    expect(html).toContain('property="og:title" content="study-ai | happyboy 的 AI 学习项目"');
    expect(html).toContain('property="og:description" content="happyboy 的学习项目，AI 学习项目"');
    expect(html).toContain(`property="og:image" content="${shareImage}"`);
    expect(html).toContain(`property="og:image:secure_url" content="${shareImage}"`);
    expect(html).toContain('property="og:image:type" content="image/png"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain(`name="twitter:image" content="${shareImage}"`);
    expect(html).toContain(`itemprop="image" content="${shareImage}"`);
    expect(html).toContain(`rel="image_src" href="${shareImage}"`);
    expect(html).toContain('name="wechat:title" content="study-ai | happyboy 的 AI 学习项目"');
    expect(html).toContain(`name="wechat:image" content="${shareImage}"`);
  });

  it("exposes favicon and crawler verification placeholders", () => {
    expect(html).toContain('rel="icon" type="image/svg+xml" href="/favicon.svg"');
    expect(html).toContain('name="google-site-verification"');
    expect(html).toContain('name="baidu-site-verification"');
    expect(existsSync(resolve(publicDir, "favicon.svg"))).toBe(true);
    expect(existsSync(resolve(publicDir, "seo-card.svg"))).toBe(true);
    expect(existsSync(resolve(publicDir, "seo-card.png"))).toBe(true);
  });
});
