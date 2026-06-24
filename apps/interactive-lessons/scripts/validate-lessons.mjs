import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const docsDirectory = resolve(import.meta.dirname, "../../../docs/interactive-learning");
const dayFiles = (await readdir(docsDirectory)).filter((file) => /^day\d{2}\.md$/.test(file)).sort();

assert.equal(dayFiles.length, 20, "课程 Markdown 必须完整发布 Day01–Day20");
assert.deepEqual(dayFiles, Array.from({ length: 20 }, (_, index) => `day${String(index + 1).padStart(2, "0")}.md`));

for (const file of dayFiles) {
  const content = await readFile(resolve(docsDirectory, file), "utf8");
  assert.match(content, /(?:^# Day|^title:)/m, `${file} 必须有课程标题`);
  assert.match(content, /(?:Core Concepts|核心概念)/, `${file} 必须包含核心概念`);
  assert.match(content, /(?:Architecture|关系图|Data And Logic Flow|Underlying Architecture)/, `${file} 必须包含关系图或数据流`);
  assert.match(content, /(?:Hands-On Practice|Practice|实践与复盘|实践)/, `${file} 必须包含实践`);
}

console.log(`Validated ${dayFiles.length} lesson documents.`);
