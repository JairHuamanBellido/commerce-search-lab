# ADR 0001: Product Search Mapping

## Status

Proposed

## Context

Commerce Search Lab needs a first OpenSearch mapping for product search. The first milestone focuses on lexical search, facets, sorting, and repeatable local testing.

## Decision

Use explicit fields for product identity, searchable text, facets, and sortable values.

Initial fields:

- `id`
- `title`
- `description`
- `category`
- `brand`
- `price`
- `rating`
- `createdAt`

Text fields should support full-text search. Facet and sort fields should use keyword or numeric types.

## Consequences

- Mapping stays simple for milestone 01.
- Relevance checks can focus on `title`, `description`, `category`, and `brand`.
- Future milestones can add synonyms, analyzers, semantic fields, or hybrid search without blocking first delivery.

