import type { CSSProperties } from "react";
import type { ArchitectureEdge, ArchitectureGroup, ArchitectureNode, LessonPage } from "../data/lessons";

const loopTypes = new Set(["feedback", "flywheel"]);

function groupNodes(nodes: ArchitectureNode[], groups: ArchitectureGroup[] = []) {
  if (groups.length === 0) return [];
  return groups.map((group) => ({
    ...group,
    nodes: nodes.filter((node) => node.group === group.id)
  }));
}

function NodeView({ node, edges = [] }: { node: ArchitectureNode; edges?: ArchitectureEdge[] }) {
  const relationEdges = edges.filter((edge) => edge.to === node.id && edge.label);

  return (
    <span className="architecture-node" data-node-id={node.id} data-tone={node.tone ?? "neutral"}>
      <span className="architecture-node-label">{node.label}</span>
      {relationEdges.length > 0 ? (
        <span className="architecture-relation-badges" aria-label="关系标记">
          {relationEdges.map((edge, index) => (
            <span
              key={`${edge.from}-${edge.to}-${edge.label ?? ""}-${index}`}
              className="architecture-relation-badge"
              data-relation={edge.relation ?? "primary"}
              data-tone={edge.tone ?? "default"}
            >
              {edge.label}
            </span>
          ))}
        </span>
      ) : null}
    </span>
  );
}

function GroupedDiagram({ nodes, groups = [], edges = [] }: { nodes: ArchitectureNode[]; groups?: ArchitectureGroup[]; edges?: ArchitectureEdge[] }) {
  const grouped = groupNodes(nodes, groups);
  if (grouped.length === 0) {
    return (
      <div className="architecture-canvas">
        <div className="architecture-node-list">
          {nodes.map((node) => (
            <NodeView key={node.id} node={node} edges={edges} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="architecture-canvas">
      <div className="architecture-groups">
        {grouped.map((group) => (
          <section key={group.id} className="architecture-group" data-kind={group.kind ?? "lane"}>
            <h3>{group.label}</h3>
            <div className="architecture-node-list">
              {group.nodes.map((node) => (
                <NodeView key={node.id} node={node} edges={edges} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function LoopDiagram({ nodes, edges = [] }: { nodes: ArchitectureNode[]; edges?: ArchitectureEdge[] }) {
  return (
    <div className="architecture-canvas">
      <div className="architecture-loop" data-count={nodes.length} style={{ "--loop-count": nodes.length } as CSSProperties}>
        {nodes.map((node, index) => (
          <div key={node.id} className="architecture-loop-slot" style={{ "--slot": index } as CSSProperties}>
            <NodeView node={node} edges={edges} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureDiagram({ lesson }: { lesson: LessonPage }) {
  const architecture = lesson.architecture;
  if (!architecture || architecture.renderMode === "none") return null;

  const content = loopTypes.has(architecture.type) ? (
    <LoopDiagram nodes={architecture.nodes} edges={architecture.edges} />
  ) : (
    <GroupedDiagram nodes={architecture.nodes} groups={architecture.groups} edges={architecture.edges} />
  );

  return (
    <figure className="architecture-diagram" data-type={architecture.type} role="img" aria-label={architecture.title}>
      <div className="diagram-heading">
        <span>{architecture.title}</span>
        <small>{architecture.summary}</small>
      </div>
      {content}
      {architecture.feedback ? <figcaption>{architecture.feedback}</figcaption> : null}
    </figure>
  );
}
