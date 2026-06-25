import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const docs = resolve(import.meta.dirname, "../../../docs/interactive-learning");
const output = resolve(import.meta.dirname, "../src/data/architectures.generated.ts");
const files = (await readdir(docs)).filter((file) => /^day\d{2}\.md$/.test(file)).sort();

function readArchitecture(source, id) {
  const raw = source.match(/<!--\s*architecture\s*\n([\s\S]*?)-->/)?.[1];
  if (!raw) throw new Error(`${id}: missing authored architecture metadata`);

  try {
    const architecture = JSON.parse(raw.trim());
    const validType = ["boundary", "lifecycle", "layered", "state", "feedback", "gate", "flywheel", "pipeline"].includes(architecture.type);
    if (!architecture.title || !architecture.summary || !validType || !Array.isArray(architecture.nodes) || architecture.nodes.length < 3) {
      throw new Error("requires title, summary, a supported type, and at least three nodes");
    }
    return architecture;
  } catch (error) {
    throw new Error(`${id}: invalid architecture metadata — ${error instanceof Error ? error.message : String(error)}`);
  }
}

const entries = await Promise.all(files.map(async (file) => {
  const source = await readFile(resolve(docs, file), "utf8");
  return [file.slice(0, -3), readArchitecture(source, file)];
}));

await writeFile(output, `import type { LessonArchitecture } from "./types";\n\nexport const architectures: Record<string, LessonArchitecture> = ${JSON.stringify(Object.fromEntries(entries), null, 2)};\n`);
