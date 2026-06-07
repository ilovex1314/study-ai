# Day02 Prompt / RAG / Grounding

## Today Goal

Build the engineering judgment to turn "ask the model" into a controlled knowledge-grounded feature. By the end, you should be able to design a prompt contract, identify when RAG is needed, and describe the retrieval data flow well enough to implement a small internal knowledge assistant.

Estimated time: 60 minutes.

## Why This Matters

Most AI product failures are not caused by the model being weak. They come from weak context design: vague prompts, unfiltered documents, missing citations, no retrieval evaluation, and no fallback when the answer is unsupported. RAG is not a product type; it is a grounding strategy that can serve chat, workflow, or an agent.

## Core Concepts

### Prompt contract

A production prompt is an interface contract. It defines the task, inputs, constraints, output schema, refusal rules, and examples. A prompt that only says "act as an expert" is not enough for engineering reuse.

### Retrieval and vector store

Retrieval uses semantic search to find relevant content. OpenAI's Retrieval docs describe vector stores as containers that power semantic search and file search; when files are added, they are chunked, embedded, and indexed. The production lesson is that documents become searchable records with metadata, not just text pasted into a prompt.

### Chunking and metadata

Chunking decides what text unit can be retrieved. Metadata decides how search can be filtered. Bad chunk boundaries can remove the evidence needed to answer a question. Missing metadata makes it hard to filter by source, product, version, tenant, or permission.

### Reranking and context compression

The first retrieval pass is usually recall-oriented. Reranking and compression reduce noise before sending context to the model. This protects token budget and answer quality.

### Grounded answer

A grounded answer should cite sources, separate known facts from inference, and avoid making unsupported claims. The model writes the response, but the system must decide what evidence it is allowed to use.

## Underlying Architecture

```text
User question
  -> Query rewrite / intent normalization
  -> Retriever
       -> keyword search
       -> vector search
       -> metadata filters
  -> Reranker
  -> Context builder
       -> source snippets
       -> citations
       -> token budget
  -> Prompt contract
  -> Model
  -> Answer validator
       -> citation coverage
       -> schema validation
       -> unsupported-claim check
  -> UI response
```

## Data And Logic Flow

1. Ingestion flow: document -> parser -> chunks -> embeddings -> vector store -> metadata index.
2. Query flow: user question -> normalized query -> retrieval -> reranking -> context pack -> model answer.
3. Feedback flow: user correction or failed answer -> log -> eval sample -> retrieval or prompt adjustment.
4. Permission flow: user identity -> source filter -> retrieval scope -> citation display.

## Key Technical Points

- Prompt design should define output schema, refusal behavior, citation requirement, and examples.
- RAG quality depends more on ingestion, chunking, metadata, and evaluation than on the vector database brand.
- Hybrid retrieval often beats pure semantic search for product names, IDs, and exact terms.
- Token budget must be managed before generation; too much context can dilute the answer.
- Retrieval evaluation needs a small golden set: question, expected evidence, acceptable answer, and failure notes.

## Upstream Dependencies And Downstream Applications

Upstream: documents, permissions, parsers, embedding model, search index, source metadata.

Downstream: knowledge-base chat, support copilot, sales enablement, internal policy assistant, agent tool context, product search.

## Production Example

An internal support assistant answers refund-policy questions. The system filters documents by region and product version, retrieves snippets, reranks them, asks the model to answer with citations, and refuses if no cited source supports the answer.

## Counterexample

Uploading the whole handbook into a vector store and telling the model "answer from the docs" is not a RAG system. Without metadata, permission filtering, citation checks, and retrieval evaluation, the answer may look confident while using the wrong source.

## Hands-On Practice

Design a minimal RAG spec for `study-ai`:

- Choose 5 source documents.
- Define chunk size, overlap, metadata fields, and permission assumptions.
- Write a prompt contract requiring citations and unsupported-answer refusal.
- Create 6 evaluation questions with expected evidence.
- Decide one fallback when retrieval confidence is low.

## Exploration Prompt

Compare OpenAI Retrieval, Mastra RAG, and a self-built pgvector pipeline. Focus on control surface, cost, observability, metadata filtering, and speed to first demo.

## Quiz

1. Why is RAG not the same kind of thing as Chat or Agent?
2. What production problem does metadata solve in retrieval?
3. Why can adding more retrieved chunks reduce answer quality?
4. What should be in a minimal retrieval evaluation sample?

## Review And Reinforcement

- If you confuse RAG with a product shape, redraw the architecture and mark where retrieval sits.
- If you miss chunking or metadata, review ingestion flow before writing prompts.
- If you over-focus on vector database choice, write the golden evaluation set first.

## References

- OpenAI Retrieval docs: https://platform.openai.com/docs/guides/retrieval
- Mastra RAG docs: https://mastra.ai/rag
- Vercel AI SDK docs: https://ai-sdk.dev/docs
