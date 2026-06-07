import type { LessonPage } from "../data/lessons";

export function ArchitectureDiagram({ lesson }: { lesson: LessonPage }) {
  if (lesson.id === "day02") {
    return <RagArchitecture />;
  }

  if (lesson.id === "day03") {
    return <AgentArchitecture />;
  }

  if (lesson.id === "day04") {
    return <ProductArchitecture />;
  }

  return <BoundaryArchitecture />;
}

function ArrowMarker() {
  return (
    <defs>
      <marker id="arch-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

function BoundaryArchitecture() {
  return (
    <div className="architecture-diagram" aria-label="AI 能力边界架构图">
      <div className="diagram-heading">
        <span>AI 能力边界架构图</span>
        <small>语义生成交给模型，状态、权限、审计和高风险动作留在确定性系统。</small>
      </div>
      <svg className="architecture-svg boundary-architecture" viewBox="0 0 980 440" role="img" aria-label="模型能力与系统控制边界">
        <ArrowMarker />
        <title>模型能力与系统控制边界</title>
        <rect className="plane model-plane" x="72" y="78" width="390" height="282" rx="18" />
        <rect className="plane system-plane" x="520" y="78" width="388" height="282" rx="18" />
        <text className="plane-title" x="96" y="114">模型能力平面</text>
        <text className="plane-title" x="544" y="114">工程控制平面</text>

        <g className="arch-card" transform="translate(118 154)">
          <rect width="220" height="72" rx="12" />
          <text x="18" y="30">上下文预算</text>
          <text className="card-sub" x="18" y="52">token / source / memory</text>
        </g>
        <g className="arch-card accent" transform="translate(204 264)">
          <rect width="230" height="72" rx="12" />
          <text x="18" y="30">LLM 语义生成</text>
          <text className="card-sub" x="18" y="52">intent / summary / JSON draft</text>
        </g>
        <g className="arch-card" transform="translate(590 146)">
          <rect width="238" height="72" rx="12" />
          <text x="18" y="30">业务状态机</text>
          <text className="card-sub" x="18" y="52">status / retry / rollback</text>
        </g>
        <g className="arch-card" transform="translate(622 260)">
          <rect width="238" height="72" rx="12" />
          <text x="18" y="30">权限与审计</text>
          <text className="card-sub" x="18" y="52">auth / policy / log</text>
        </g>

        <path className="arch-flow" d="M48 220 H118" />
        <text className="edge-label" x="36" y="202">用户输入</text>
        <path className="arch-flow" d="M338 190 C412 190 420 292 204 292" />
        <path className="arch-flow strong" d="M434 300 C520 300 532 184 590 184" />
        <path className="arch-flow" d="M710 218 V260" />
        <path className="arch-flow feedback" d="M622 314 C492 392 260 386 204 336" />
        <text className="edge-label" x="462" y="276">结构化输出 + 校验</text>
        <text className="edge-label" x="268" y="392">失败样本回流评估</text>
      </svg>
    </div>
  );
}

function RagArchitecture() {
  return (
    <div className="architecture-diagram" aria-label="RAG 证据闭环架构图">
      <div className="diagram-heading">
        <span>RAG 证据闭环架构图</span>
        <small>离线知识入库和在线检索生成是两条链路，eval 同时检查证据召回和答案引用。</small>
      </div>
      <svg className="architecture-svg rag-architecture" viewBox="0 0 980 520" role="img" aria-label="RAG 离线入库与在线检索生成">
        <ArrowMarker />
        <title>RAG 离线入库与在线检索生成</title>
        <text className="lane-title" x="54" y="64">离线入库链路</text>
        <text className="lane-title" x="54" y="292">在线问答链路</text>
        <path className="lane-line" d="M44 90 H930" />
        <path className="lane-line" d="M44 318 H930" />

        <g className="arch-card" transform="translate(72 118)"><rect width="150" height="72" rx="12" /><text x="18" y="30">知识源</text><text className="card-sub" x="18" y="52">docs / DB / API</text></g>
        <g className="arch-card" transform="translate(282 118)"><rect width="170" height="72" rx="12" /><text x="18" y="30">解析切分</text><text className="card-sub" x="18" y="52">parse / chunk</text></g>
        <g className="arch-card" transform="translate(512 118)"><rect width="170" height="72" rx="12" /><text x="18" y="30">元数据与向量</text><text className="card-sub" x="18" y="52">metadata / embed</text></g>
        <g className="arch-card accent" transform="translate(742 118)"><rect width="170" height="72" rx="12" /><text x="18" y="30">混合索引</text><text className="card-sub" x="18" y="52">BM25 + vector</text></g>

        <g className="arch-card" transform="translate(72 346)"><rect width="150" height="72" rx="12" /><text x="18" y="30">用户问题</text><text className="card-sub" x="18" y="52">query rewrite</text></g>
        <g className="arch-card" transform="translate(282 346)"><rect width="170" height="72" rx="12" /><text x="18" y="30">召回与重排</text><text className="card-sub" x="18" y="52">filter / rerank</text></g>
        <g className="arch-card" transform="translate(512 346)"><rect width="170" height="72" rx="12" /><text x="18" y="30">上下文构造</text><text className="card-sub" x="18" y="52">top-k / compress</text></g>
        <g className="arch-card accent" transform="translate(742 346)"><rect width="170" height="72" rx="12" /><text x="18" y="30">带引用回答</text><text className="card-sub" x="18" y="52">answer / cite / refuse</text></g>

        <path className="arch-flow" d="M222 154 H282" /><path className="arch-flow" d="M452 154 H512" /><path className="arch-flow" d="M682 154 H742" />
        <path className="arch-flow" d="M222 382 H282" /><path className="arch-flow" d="M452 382 H512" /><path className="arch-flow" d="M682 382 H742" />
        <path className="arch-flow strong" d="M826 190 C826 254 402 254 368 346" />
        <path className="arch-flow feedback" d="M742 418 C574 492 324 492 282 418" />
        <text className="edge-label" x="458" y="244">检索证据进入在线链路</text>
        <text className="edge-label" x="400" y="486">golden set 检查召回、引用和 no-answer</text>
      </svg>
    </div>
  );
}

function AgentArchitecture() {
  return (
    <div className="architecture-diagram" aria-label="Agent 执行控制架构图">
      <div className="diagram-heading">
        <span>Agent 执行控制架构图</span>
        <small>Agent 是循环执行体；工具、状态、审批和 trace 是系统层能力，不是 prompt 文案。</small>
      </div>
      <svg className="architecture-svg agent-architecture" viewBox="0 0 980 500" role="img" aria-label="Agent loop 与工具执行控制">
        <ArrowMarker />
        <title>Agent loop 与工具执行控制</title>
        <circle className="loop-ring" cx="376" cy="248" r="154" />
        <g className="arch-card accent" transform="translate(266 78)"><rect width="220" height="72" rx="12" /><text x="18" y="30">Planner / LLM</text><text className="card-sub" x="18" y="52">decide next action</text></g>
        <g className="arch-card" transform="translate(94 214)"><rect width="206" height="72" rx="12" /><text x="18" y="30">Observation</text><text className="card-sub" x="18" y="52">tool result / user input</text></g>
        <g className="arch-card" transform="translate(452 214)"><rect width="206" height="72" rx="12" /><text x="18" y="30">Tool Intent</text><text className="card-sub" x="18" y="52">name + typed args</text></g>
        <g className="arch-card" transform="translate(266 362)"><rect width="220" height="72" rx="12" /><text x="18" y="30">Stop / Handoff</text><text className="card-sub" x="18" y="52">answer / ask / delegate</text></g>

        <g className="arch-card system" transform="translate(720 96)"><rect width="202" height="72" rx="12" /><text x="18" y="30">Tool Registry</text><text className="card-sub" x="18" y="52">schemas / scopes</text></g>
        <g className="arch-card system" transform="translate(720 220)"><rect width="202" height="72" rx="12" /><text x="18" y="30">执行沙箱</text><text className="card-sub" x="18" y="52">auth / rate limit</text></g>
        <g className="arch-card system" transform="translate(720 344)"><rect width="202" height="72" rx="12" /><text x="18" y="30">Checkpoint + Trace</text><text className="card-sub" x="18" y="52">resume / audit</text></g>
        <g className="approval-gate" transform="translate(612 320)"><path d="M52 0 L104 44 L52 88 L0 44 Z" /><text x="52" y="40">人工</text><text x="52" y="58">确认</text></g>

        <path className="arch-flow" d="M376 150 C516 150 538 210 555 214" /><path className="arch-flow" d="M555 286 C520 368 454 398 376 398" />
        <path className="arch-flow" d="M266 398 C138 360 108 276 197 250" /><path className="arch-flow" d="M197 214 C218 132 286 114 376 114" />
        <path className="arch-flow strong" d="M658 250 H720" /><path className="arch-flow" d="M821 168 V220" /><path className="arch-flow" d="M821 292 V344" />
        <path className="arch-flow feedback" d="M720 380 C622 462 202 462 197 286" />
      </svg>
    </div>
  );
}

function ProductArchitecture() {
  return (
    <div className="architecture-diagram" aria-label="AI 产品化交付架构图">
      <div className="diagram-heading">
        <span>AI 产品化交付架构图</span>
        <small>从用户体验到模型网关、编排、观测和发布回滚，形成可上线的产品闭环。</small>
      </div>
      <svg className="architecture-svg product-architecture" viewBox="0 0 980 520" role="img" aria-label="AI 产品化交付分层架构">
        <ArrowMarker />
        <title>AI 产品化交付分层架构</title>
        <g className="arch-card" transform="translate(68 86)"><rect width="190" height="96" rx="12" /><text x="18" y="32">前端体验层</text><text className="card-sub" x="18" y="56">stream / edit / cancel</text><text className="card-sub" x="18" y="76">citations / confirmation</text></g>
        <g className="arch-card accent" transform="translate(328 86)"><rect width="210" height="96" rx="12" /><text x="18" y="32">API 编排层</text><text className="card-sub" x="18" y="56">auth / queue / state</text><text className="card-sub" x="18" y="76">workflow / agent run</text></g>
        <g className="arch-card" transform="translate(608 86)"><rect width="210" height="96" rx="12" /><text x="18" y="32">模型网关</text><text className="card-sub" x="18" y="56">routing / fallback</text><text className="card-sub" x="18" y="76">token cost / timeout</text></g>

        <g className="service-box" transform="translate(110 258)"><rect width="156" height="72" rx="12" /><text x="78" y="32">RAG 服务</text><text x="78" y="52">retrieval + cite</text></g>
        <g className="service-box" transform="translate(326 258)"><rect width="156" height="72" rx="12" /><text x="78" y="32">工具服务</text><text x="78" y="52">side effects</text></g>
        <g className="service-box" transform="translate(542 258)"><rect width="156" height="72" rx="12" /><text x="78" y="32">Provider</text><text x="78" y="52">OpenAI / Claude</text></g>
        <g className="service-box" transform="translate(758 258)"><rect width="156" height="72" rx="12" /><text x="78" y="32">人工队列</text><text x="78" y="52">review / approve</text></g>

        <g className="ops-bar" transform="translate(92 402)"><rect width="786" height="72" rx="14" /><text x="28" y="30">质量与运维闭环</text><text className="card-sub" x="28" y="52">trace logs / eval dataset / cost metrics / feedback / version / rollback</text></g>

        <path className="arch-flow" d="M258 134 H328" /><path className="arch-flow" d="M538 134 H608" />
        <path className="arch-flow" d="M433 182 V258" /><path className="arch-flow" d="M713 182 C716 224 672 238 620 258" />
        <path className="arch-flow" d="M433 182 C350 212 234 230 188 258" /><path className="arch-flow" d="M433 182 C560 216 748 218 836 258" />
        <path className="arch-flow feedback" d="M822 402 C816 360 714 342 620 330" />
        <path className="arch-flow feedback" d="M188 402 C188 360 188 346 188 330" />
        <path className="arch-flow feedback" d="M433 402 V330" />
      </svg>
    </div>
  );
}
