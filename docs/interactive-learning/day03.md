# Day03 Agent Architecture And Orchestration

## Today Goal

Learn how to design an agent as a controlled execution system rather than a chat prompt with tools attached. By the end, you should be able to draw an agent loop, decide when to use workflow control, and specify tracing, state, guardrails, and human confirmation.

Estimated time: 60 minutes.

## Why This Matters

Agent demos often work because the task is forgiving. Production agents need execution state, tool permissions, retries, audit logs, confirmation points, and observability. The model may decide the next step, but your system owns the boundary.

## Core Concepts

### Agent

An agent is an execution entity that uses a model to choose actions toward a goal. It may call tools, inspect state, ask for clarification, hand off to another agent, or stop.

### Workflow

A workflow is a deterministic control structure. It is better when the process is known: approvals, queues, retries, SLAs, billing, and audit.

### Tool call

A tool call is not the action itself. The model proposes a structured call; the application validates, authorizes, executes, logs, and returns the result.

### State and memory

State tracks the current run. Memory stores reusable knowledge across runs. Mixing them causes bugs: a run retry should not rewrite long-term user preference unless explicitly approved.

### Human-in-the-loop

LangGraph's interrupt pattern pauses execution and resumes with a command. The production pattern is not "ask human yes/no"; it is "show the payload, risk, model reasoning, and proposed action before resuming."

## Underlying Architecture

```text
User goal
  -> Orchestrator
       -> policy check
       -> state load
       -> model step
       -> tool proposal
       -> validation and authorization
       -> tool execution
       -> trace event
       -> state update
       -> stop / continue / ask human / handoff
  -> Final response
  -> Eval and feedback log
```

## Data And Logic Flow

1. Run starts with a goal, user identity, and allowed tool scope.
2. Orchestrator loads state and builds the next model context.
3. Model proposes a tool call, handoff, clarification, or final response.
4. System validates schema, permission, rate limits, and risk.
5. Tool executes outside the model and returns structured output.
6. Trace records model call, tool call, guardrail, handoff, and custom events.
7. State updates and the loop either continues, pauses for human input, or exits.

## Key Technical Points

- Agent autonomy is a dial, not a binary. Give autonomy to low-risk semantic work; keep deterministic control over money, permission, deletion, and external side effects.
- Tool schemas need narrow arguments and explicit failure results.
- Tracing is not optional for production. OpenAI Agents SDK traces model generations, tool calls, handoffs, guardrails, and custom events by default.
- Durable execution matters for long-running tasks. LangGraph uses persistence/checkpointers so execution can resume after interrupts or failures.
- Handoffs are useful when responsibilities differ, but they add cost and coordination risk.

## Upstream Dependencies And Downstream Applications

Upstream: model provider, tool APIs, permission model, state store, queue, tracing backend, evaluation set.

Downstream: coding assistant, research assistant, ticket triage, internal operations automation, browser automation, data-analysis copilot.

## Production Example

A PR review agent reads changed files, calls a static-analysis tool, checks project conventions, drafts findings, and asks a human before posting comments. It traces each model call and tool result, and it never merges code without an explicit user action.

## Counterexample

"Let the agent decide everything" is not architecture. If the agent can delete files, spend credits, contact users, or update production systems without permission checks and audit logs, the system is unsafe even if the demo looks smart.

## Hands-On Practice

Design an agent orchestrator for a requirement-review assistant:

- Define state fields.
- Define three tools and their schemas.
- Mark which actions require human confirmation.
- Specify trace events.
- Write one failure recovery rule for a tool timeout.

## Exploration Prompt

Compare OpenAI Agents SDK, LangGraph, and Mastra for a long-running engineering assistant. Which one gives you the best control over tools, state, tracing, and TypeScript integration?

## Quiz

1. What is the difference between run state and long-term memory?
2. Why should the application validate and authorize tool calls?
3. When is workflow control better than agent autonomy?
4. What should a human approval screen show before resuming an agent?

## Review And Reinforcement

- If you treat Agent and Workflow as peers, redraw them as autonomy vs deterministic-control choices.
- If you forget tracing, write the events needed to debug a failed tool call.
- If you overuse multi-agent design, collapse roles until one orchestrator cannot reasonably handle the task.

## References

- OpenAI Agents SDK docs: https://platform.openai.com/docs/guides/agents-sdk/
- OpenAI Agents SDK tracing: https://openai.github.io/openai-agents-python/tracing/
- LangGraph interrupts: https://langchain-ai.github.io/langgraph/how-tos/human_in_the_loop/wait-user-input/
- LangGraph durable execution: https://langchain-ai.github.io/langgraph/concepts/durable_execution/
