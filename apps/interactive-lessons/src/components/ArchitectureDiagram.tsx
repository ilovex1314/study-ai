import type { LessonPage } from "../data/lessons";

export function ArchitectureDiagram({ lesson }: { lesson: LessonPage }) {
  const architecture = lesson.architecture;

  if (!architecture) {
    return null;
  }

  return (
    <figure className="architecture-diagram" data-type={architecture.type} role="img" aria-label={architecture.title}>
      <div className="diagram-heading">
        <span>{architecture.title}</span>
        <small>{architecture.summary}</small>
      </div>
      <div className="architecture-flow">
        {architecture.nodes.map((node, index) => (
          <span key={node.label} className="architecture-node" data-tone={node.tone ?? "neutral"}>
            {node.label}
            {architecture.type === "lifecycle" && index < architecture.nodes.length - 1 ? <i aria-hidden="true">→</i> : null}
          </span>
        ))}
      </div>
      {architecture.feedback ? <figcaption>{architecture.feedback}</figcaption> : null}
    </figure>
  );
}
