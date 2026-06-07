# Day04 AI Product Delivery And Operations

## Today Goal

Understand what turns an AI demo into a usable product: UX, model gateway, evaluation, observability, cost control, safety, deployment, and iteration. By the end, you should be able to design the delivery architecture for a small AI product.

Estimated time: 60 minutes.

## Why This Matters

The model is only one component. Real users experience latency, confusing partial outputs, missing citations, failed tool calls, cost spikes, privacy constraints, and bad recovery paths. Product delivery is the layer that makes AI useful rather than impressive.

## Core Concepts

### Model gateway

A model gateway centralizes provider selection, retries, fallback, timeout, token accounting, and audit. It prevents every feature from hardcoding model calls.

### Streaming UX

Streaming is not just faster text. It shapes user trust: show progress, tool activity, citations, cancellation, and editable output. Vercel AI SDK is strong for TypeScript streaming and UI integration, but complex orchestration still needs backend control.

### Evaluation dataset

An eval set turns subjective "seems better" into measurable quality. It should include normal cases, edge cases, refusals, retrieval failures, and regression cases.

### Observability

Logs, traces, cost metrics, latency, tool failures, retrieval hit rate, and user feedback are the product nervous system. Without them, iteration is guesswork.

### Cost and risk control

Cost control includes token budget, model routing, caching, context compression, background jobs, and failure fallback. Risk control includes permission, guardrails, human review, and audit.

## Underlying Architecture

```text
Frontend
  -> API route
  -> Auth and quota
  -> Model gateway
       -> provider adapter
       -> prompt/version registry
       -> retry/fallback
       -> token accounting
  -> Orchestrator
       -> retrieval
       -> tools
       -> human confirmation
  -> Observability
       -> logs
       -> traces
       -> eval samples
       -> cost dashboard
  -> Deployment and rollback
```

## Data And Logic Flow

1. User action creates a task with identity, permissions, and product context.
2. API route validates input and selects a model or workflow path.
3. Model gateway applies provider policy, timeout, retry, and budget.
4. Orchestrator retrieves context or calls tools.
5. UI streams progress, output, citations, and confirmation prompts.
6. Logs and traces capture quality, cost, latency, and failures.
7. Feedback becomes eval samples and drives prompt, retrieval, or model changes.

## Key Technical Points

- Separate provider adapter from feature code.
- Version prompts, retrieval config, and model choices.
- Track input tokens, output tokens, latency, failure mode, and user outcome.
- Keep high-risk actions behind human confirmation.
- Use offline eval before rollout and online feedback after rollout.
- Design fallback states: no answer, low confidence, provider outage, tool timeout, permission denied.

## Upstream Dependencies And Downstream Applications

Upstream: auth, billing, model providers, storage, retrieval, queues, telemetry, CI/CD.

Downstream: customer support copilot, product assistant, internal operations agent, coding assistant, document review, analytics assistant.

## Production Example

A requirements-review assistant accepts a PRD, extracts risks, proposes API boundaries, and generates test scenarios. It streams intermediate analysis, stores the run, tracks cost, allows human editing, and turns accepted outputs into tasks.

## Counterexample

A demo that directly calls one model from the frontend, stores no run logs, has no eval samples, and cannot explain why an answer changed is not ready for real users.

## Hands-On Practice

Write a delivery checklist for your first AI product:

- Model gateway rules.
- UI streaming states.
- Required logs and traces.
- Eval dataset columns.
- Cost budget and fallback.
- Deployment and rollback strategy.

## Exploration Prompt

Look at one AI feature you use daily. Identify which parts are model capability and which parts are product delivery: UI, source grounding, retries, privacy, review, and feedback loops.

## Quiz

1. Why should model calls go through a gateway?
2. What is the difference between offline eval and online feedback?
3. Which metrics reveal cost and latency problems?
4. Why is streaming UX more than rendering text token by token?

## Review And Reinforcement

- If you only think about prompts, draw the full request-to-feedback loop.
- If you cannot name your eval samples, the product cannot be measured.
- If fallback behavior is missing, write the unhappy paths before adding features.

## References

- Vercel AI SDK docs: https://ai-sdk.dev/docs
- OpenAI Agents SDK tracing: https://openai.github.io/openai-agents-python/tracing/
- OpenAI Retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Dify docs: https://docs.dify.ai/
