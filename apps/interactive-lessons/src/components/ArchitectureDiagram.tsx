import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { ArchitectureEdge, ArchitectureGroup, ArchitectureNode, LessonPage } from "../data/lessons";

const loopTypes = new Set(["feedback", "flywheel"]);

type ConnectorPath = {
  edge: ArchitectureEdge;
  labelX: number;
  labelY: number;
  path: string;
};

function groupNodes(nodes: ArchitectureNode[], groups: ArchitectureGroup[] = []) {
  if (groups.length === 0) return [];
  return groups.map((group) => ({
    ...group,
    nodes: nodes.filter((node) => node.group === group.id)
  }));
}

function NodeView({ node }: { node: ArchitectureNode }) {
  return (
    <span className="architecture-node" data-node-id={node.id} data-tone={node.tone ?? "neutral"}>
      <span className="architecture-node-label">{node.label}</span>
    </span>
  );
}

function edgePath(edge: ArchitectureEdge, from: DOMRect, to: DOMRect, canvas: DOMRect) {
  if (edge.relation === "feedback" || edge.relation === "dependency") {
    const startX = from.right - canvas.left + 4;
    const startY = from.top - canvas.top + from.height / 2;
    const endX = to.right - canvas.left + 4;
    const endY = to.top - canvas.top + to.height / 2;
    const outsideRailX = Math.max(startX, endX) + 40;
    const insideRailX = canvas.width - 18;
    const railX = insideRailX - Math.max(startX, endX) >= 24 ? insideRailX : outsideRailX;

    return {
      labelX: railX - 10,
      labelY: (startY + endY) / 2,
      path: `M ${startX} ${startY} H ${railX} V ${endY} H ${endX}`
    };
  }

  const fromCenterX = from.left - canvas.left + from.width / 2;
  const fromCenterY = from.top - canvas.top + from.height / 2;
  const toCenterX = to.left - canvas.left + to.width / 2;
  const toCenterY = to.top - canvas.top + to.height / 2;
  const deltaX = toCenterX - fromCenterX || 1;
  const deltaY = toCenterY - fromCenterY || 1;
  const fromScale = Math.min((from.width / 2) / Math.abs(deltaX), (from.height / 2) / Math.abs(deltaY));
  const toScale = Math.min((to.width / 2) / Math.abs(deltaX), (to.height / 2) / Math.abs(deltaY));
  const startX = fromCenterX + deltaX * fromScale;
  const startY = fromCenterY + deltaY * fromScale;
  const endX = toCenterX - deltaX * toScale;
  const endY = toCenterY - deltaY * toScale;
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  if (edge.relation === "branch" || edge.relation === "guard") {
    const offset = Math.max(18, Math.abs(startY - endY) * 0.18);
    return {
      labelX: midX,
      labelY: midY - offset,
      path: `M ${startX} ${startY} Q ${midX} ${midY - offset * 2}, ${endX} ${endY}`
    };
  }

  return {
    labelX: midX,
    labelY: midY - 8,
    path: `M ${startX} ${startY} L ${endX} ${endY}`
  };
}

function ConnectorLayer({ edges, nodes, paths, width, height }: { edges: ArchitectureEdge[]; nodes: ArchitectureNode[]; paths: ConnectorPath[]; width: number; height: number }) {
  const markerSeed = useId().replace(/:/g, "");
  const labelFor = (id: string) => nodes.find((node) => node.id === id)?.label ?? id;
  const fallbackPaths = useMemo(
    () =>
      edges.map((edge, index) => ({
        edge,
        labelX: edge.relation === "feedback" || edge.relation === "dependency" ? 82 : 10,
        labelY: index * 10 + 9,
        path: edge.relation === "feedback" || edge.relation === "dependency" ? `M 40 ${index * 10} H 92 V ${index * 10 + 18} H 40` : `M 0 ${index * 10} L 20 ${index * 10}`
      })),
    [edges]
  );
  const visiblePaths = paths.length > 0 ? paths : fallbackPaths;
  const viewWidth = width || 1;
  const viewHeight = height || 1;

  if (edges.length === 0) return null;

  return (
    <svg className="architecture-connectors" viewBox={`0 0 ${viewWidth} ${viewHeight}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id={`${markerSeed}-arrow`} markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M 1.5 1.2 L 8 4.5 L 1.5 7.8 z" />
        </marker>
      </defs>
      {visiblePaths.map(({ edge, labelX, labelY, path }, index) => (
        <g
          key={`${edge.from}-${edge.to}-${edge.label ?? ""}-${index}`}
          className="architecture-connector"
          data-relation={edge.relation ?? "primary"}
          data-tone={edge.tone ?? "default"}
          data-from={edge.from}
          data-to={edge.to}
          aria-label={`${labelFor(edge.from)} 到 ${labelFor(edge.to)}${edge.label ? `：${edge.label}` : ""}`}
        >
          <path d={path} markerEnd={`url(#${markerSeed}-arrow)`} />
          {edge.label ? (
            <text className="architecture-connector-label" x={labelX} y={Math.max(14, labelY)} textAnchor="middle">
              {edge.label}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}

function ArchitectureCanvas({ children, edges = [], nodes }: { children: ReactNode; edges?: ArchitectureEdge[]; nodes: ArchitectureNode[] }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<{ height: number; paths: ConnectorPath[]; width: number }>({ height: 0, paths: [], width: 0 });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const measure = () => {
      const canvasRect = canvas.getBoundingClientRect();
      if (canvasRect.width <= 0 || canvasRect.height <= 0) {
        setLayout({ height: 0, paths: [], width: 0 });
        return;
      }

      const paths = edges.flatMap((edge) => {
        const from = canvas.querySelector<HTMLElement>(`[data-node-id="${edge.from}"]`);
        const to = canvas.querySelector<HTMLElement>(`[data-node-id="${edge.to}"]`);
        if (!from || !to) return [];
        return [{ edge, ...edgePath(edge, from.getBoundingClientRect(), to.getBoundingClientRect(), canvasRect) }];
      });

      setLayout({ height: canvasRect.height, paths, width: canvasRect.width });
    };

    measure();

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(canvas);
    window.addEventListener("resize", measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [edges]);

  return (
    <div className="architecture-canvas" ref={canvasRef}>
      <ConnectorLayer edges={edges} height={layout.height} nodes={nodes} paths={layout.paths} width={layout.width} />
      {children}
    </div>
  );
}

function GroupedDiagram({ nodes, groups = [], edges = [] }: { nodes: ArchitectureNode[]; groups?: ArchitectureGroup[]; edges?: ArchitectureEdge[] }) {
  const grouped = groupNodes(nodes, groups);
  if (grouped.length === 0) {
    return (
      <ArchitectureCanvas edges={edges} nodes={nodes}>
        <div className="architecture-node-list">
          {nodes.map((node) => (
            <NodeView key={node.id} node={node} />
          ))}
        </div>
      </ArchitectureCanvas>
    );
  }

  return (
    <ArchitectureCanvas edges={edges} nodes={nodes}>
      <div className="architecture-groups">
        {grouped.map((group) => (
          <section key={group.id} className="architecture-group" data-kind={group.kind ?? "lane"}>
            <h3>{group.label}</h3>
            <div className="architecture-node-list">
              {group.nodes.map((node) => (
                <NodeView key={node.id} node={node} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </ArchitectureCanvas>
  );
}

function LoopDiagram({ nodes, edges = [] }: { nodes: ArchitectureNode[]; edges?: ArchitectureEdge[] }) {
  return (
    <ArchitectureCanvas edges={edges} nodes={nodes}>
      <div className="architecture-loop" data-count={nodes.length} style={{ "--loop-count": nodes.length } as CSSProperties}>
        {nodes.map((node, index) => (
          <div key={node.id} className="architecture-loop-slot" style={{ "--slot": index } as CSSProperties}>
            <NodeView node={node} />
          </div>
        ))}
      </div>
    </ArchitectureCanvas>
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
