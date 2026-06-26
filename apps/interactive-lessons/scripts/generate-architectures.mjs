import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const docs = resolve(import.meta.dirname, "../../../docs/interactive-learning");
const output = resolve(import.meta.dirname, "../src/data/architectures.generated.ts");
const files = (await readdir(docs)).filter((file) => /^day\d{2}\.md$/.test(file)).sort();

const validTypes = ["boundary", "lifecycle", "layered", "state", "feedback", "gate", "flywheel", "pipeline", "tree"];
const arrowPattern = /[→←↔]|->|<-/;

function assertUnique(values, label, id) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length > 0) {
    throw new Error(`${id}: duplicate ${label}: ${[...new Set(duplicates)].join(", ")}`);
  }
}

function readArchitecture(source, id) {
  const raw = source.match(/<!--\s*architecture\s*\n([\s\S]*?)-->/)?.[1];
  if (!raw) throw new Error(`${id}: missing authored architecture metadata`);

  try {
    const architecture = JSON.parse(raw.trim());
    if (!architecture.title || !architecture.summary || !validTypes.includes(architecture.type) || !Array.isArray(architecture.nodes) || architecture.nodes.length < 3) {
      throw new Error("requires title, summary, a supported type, and at least three nodes");
    }

    const renderMode = architecture.renderMode ?? "diagram";
    if (!["diagram", "structured-list", "none"].includes(renderMode)) {
      throw new Error("renderMode must be diagram, structured-list, or none");
    }

    for (const node of architecture.nodes) {
      if (!node.id || !node.label) throw new Error("each node requires id and label");
      if (arrowPattern.test(node.label)) throw new Error(`node label must not contain arrows: ${node.label}`);
    }
    assertUnique(architecture.nodes.map((node) => node.id), "node id", id);

    const nodeIds = new Set(architecture.nodes.map((node) => node.id));
    const groups = architecture.groups ?? [];
    assertUnique(groups.map((group) => group.id), "group id", id);
    const groupIds = new Set(groups.map((group) => group.id));
    for (const node of architecture.nodes) {
      if (node.group && !groupIds.has(node.group)) throw new Error(`node ${node.id} references missing group ${node.group}`);
    }

    const edges = architecture.edges ?? [];
    if (renderMode !== "none" && edges.length + groups.length === 0) {
      throw new Error("diagram architectures require at least one edge or group");
    }
    for (const edge of edges) {
      if (!nodeIds.has(edge.from)) throw new Error(`edge references missing from node ${edge.from}`);
      if (!nodeIds.has(edge.to)) throw new Error(`edge references missing to node ${edge.to}`);
      if (edge.label && arrowPattern.test(edge.label)) throw new Error(`edge label must not contain arrows: ${edge.label}`);
    }

    const relations = new Set(edges.map((edge) => edge.relation));
    const groupKinds = new Set(groups.map((group) => group.kind));
    if (["feedback", "flywheel"].includes(architecture.type) && !relations.has("feedback")) {
      throw new Error(`${architecture.type} requires a feedback edge`);
    }
    if (["gate", "state"].includes(architecture.type) && ![...relations].some((relation) => relation === "branch" || relation === "guard" || relation === "feedback")) {
      throw new Error(`${architecture.type} requires branch, guard, or feedback edge`);
    }
    if (architecture.type === "layered" && !groupKinds.has("layer") && !groupKinds.has("lane")) {
      throw new Error("layered requires layer or lane groups");
    }
    if (architecture.type === "boundary" && !groupKinds.has("boundary") && ![...relations].some((relation) => relation === "guard" || relation === "dependency")) {
      throw new Error("boundary requires boundary groups or guard/dependency edges");
    }

    return { ...architecture, renderMode };
  } catch (error) {
    throw new Error(`${id}: invalid architecture metadata — ${error instanceof Error ? error.message : String(error)}`);
  }
}

const entries = await Promise.all(files.map(async (file) => {
  const source = await readFile(resolve(docs, file), "utf8");
  return [file.slice(0, -3), readArchitecture(source, file)];
}));

await writeFile(output, `import type { LessonArchitecture } from "./types";\n\nexport const architectures: Record<string, LessonArchitecture> = ${JSON.stringify(Object.fromEntries(entries), null, 2)};\n`);
