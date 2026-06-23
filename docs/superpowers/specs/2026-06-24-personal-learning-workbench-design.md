# Personal AI Learning Workbench Design

## Scope

Refactor the existing React learning application into a **personal, local-first AI engineering learning workbench**. This is P0 of the product PRD: it deliberately excludes login, cloud sync, team views and a live AI coach, while leaving clean boundaries for them later.

The work replaces—not merely extends—the existing Day01–Day13 sequence with a dependency-led Day01–Day20 curriculum. It also synchronizes the README and Markdown learning material with the shipped application.

## Learner and Outcome

The learner is an experienced frontend/backend engineer. Each day takes about 60 minutes and produces a verifiable engineering artifact: a decision, design, implementation sketch, evaluation asset, or project evidence.

The end state is the ability to define, build, evaluate, operate, and iterate a production-minded AI product—not simply recognize model vocabulary or platform names.

## Curriculum Architecture

The course follows capability dependencies. Specific platforms and frameworks are implementation paths inside relevant days, never the primary sequence.

| Stage | Days | Capability outcome |
| --- | --- | --- |
| Define reliable AI behavior | 01–05 | Frame a measurable AI task; place model boundaries; use prompts, evidence, tools, workflows and agents safely. |
| Build a production system | 06–11 | Design AI UX, knowledge lifecycle, policy controls, evaluation, observability, cost/latency and technical choices. |
| Extend and operate | 12–16 | Handle multimodal/realtime input, durable execution, release governance and AI SRE. |
| Deliver verifiable project evidence | 17–20 | Discover a project, define architecture/data contracts, implement/evaluate it, then release, review and record capability evidence. |

Each day has: a concrete goal; core concepts; a **relationship-oriented** architecture diagram; a production and counterexample; an open practice task; at least four weighted questions; review advice; and authoritative references.

## Application Boundaries

### Curriculum domain

`curriculum` owns the ordered stages, prerequisite metadata, titles, summary and measurable daily outcome. It is the only source of truth for the Day01–Day20 route list and series navigation.

### Lesson content domain

`lesson-content` owns concepts, examples, practice tasks, references and diagram specifications. It must not own React state or browser persistence.

Diagrams are selected by **relationship type**, rather than one generic left-to-right flow:

- responsibility/boundary maps for model-policy-system separation;
- lifecycle maps for ingestion, versioning and deletion;
- layered system maps for components and ownership;
- state maps for durable workflows and approvals;
- feedback loops for evaluation, operations and product learning.

On desktop a diagram occupies its own full-width row. At narrow widths it changes to a compact grid, reducing node size, labels and padding before any overlap is allowed.

### Assessment domain

`assessment` owns question weighting, scoring and review derivation. A day totals exactly 100 points. Question weight represents importance (for example: architectural judgment 30, core concept 20, applied diagnostic 15, recall check 10–15) rather than equal question count.

The learner switches primarily through a numbered question list. Previous/next controls remain secondary. The list only communicates selected/unselected state; a current question’s score appears beside its content metadata, not inside the question-number item. Review and history display scores as points out of 100.

### Learner state domain

`learner-state` remains local-first through an adapter interface. It persists current answers, attempts, weak capabilities, practice evidence and exported history. A future cloud adapter can replace storage without changing lesson or assessment components.

### Workspace UI domain

The UI maintains the deployed visual language: warm paper surfaces, deep blue for system/selected state, gold for primary action, restrained rust labels, and high-contrast editorial typography.

Hero hierarchy is one small context label, one readable capability statement and one compact outcome paragraph. Heading line-height remains relaxed (roughly 1.3–1.4); forced wrapping is avoided unless it improves a breakpoint deliberately.

## Responsive Navigation

The application uses five content anchors: route, concepts, architecture, practice and review.

- **Desktop:** A viewport-fixed right-edge tab remains visible in its collapsed state. Hover or keyboard focus expands a floating menu over the right edge. It is an overlay with a high z-index and never changes the content grid’s width. Active state is updated from direct section routes and viewport observation.
- **H5:** The fixed rail is absent. A compact, sticky horizontal text navigation appears inside the page header, can scroll sideways, and uses an active underline rather than heavy boxed buttons. It must never conceal heading content or diagram controls.
- Navigation supports click, keyboard focus, direct section URLs and scroll-driven active-state changes without routes fighting programmatic scroll.

## Personal Workbench UX

The app remains a one-page learning experience per day, but its sections form a clear evidence loop:

`ability route → concepts → architecture judgment → open practice evidence → weighted assessment → review → capability evidence`

P0 represents practice evidence locally; it does not simulate a cloud profile, team dashboard or AI coach.

## Documentation Contract

- `README.md` describes the actual Day01–Day20 app, start/build/test commands, local-first scope and deployment behavior.
- `docs/interactive-learning/overview.md` is the course source of truth and matches application titles/order.
- Every `docs/interactive-learning/dayXX.md` conforms to the study-plan lesson contract and matches application lesson data.
- Product and architecture docs distinguish P0 local-only behavior from later PRD phases.

## Verification

Automated tests validate:

1. Markdown and typed lesson counts are both 20, with matching routes and ordered titles.
2. Every lesson has required concepts, an architecture/relationship map, practice, at least four questions and 100 total weighted points.
3. Every question’s concept belongs to that lesson; every capability recommendation resolves to content.
4. Direct navigation, scroll synchronization, desktop collapsed/expanded rail semantics and H5 navigation behavior remain accessible.
5. Score, retry, history, export and storage migration remain correct under the weighted scoring model.

Manual responsive verification covers 375, 768, 1024 and 1440 px widths; fixed navigation must not affect the main content width, and diagrams must not overlap or overflow.

## Out of Scope

No authentication, cloud persistence, collaborative/team views, external project submission, live RAG/AI coach, AI grading or production backend is introduced in this iteration.
