# Commerce Search Lab

Commerce Search Lab is a practical OpenSearch project for building e-commerce product search with SvelteKit and TypeScript. It focuses on catalog modeling, field mappings, lexical queries, facets, sorting, and basic relevance checks before expanding into advanced retrieval techniques.

## Current Milestone

A user can search a seeded product catalog through OpenSearch using title, description, category, and brand, with explicit mappings, repeatable local setup, and basic relevance checks.

## Tech Stack

- SvelteKit
- TypeScript
- OpenSearch
- Docker

## Non-Goals For First Milestone

- Semantic search
- Embeddings
- Recommendations
- Personalization
- Generative AI
- Production infrastructure

## First Milestone Issues

1. Create repeatable local OpenSearch setup.
2. Create seeded product catalog.
3. Define product search mapping.
4. Ingest catalog into OpenSearch.
5. Add basic search query.
6. Add basic relevance checks.

## Documentation

- [Project brief](docs/project/project-brief.md)
- [Milestone 01 plan](docs/project/milestone-01-basic-product-search.md)
- [ADR 0001: Product search mapping](docs/adr/0001-product-search-mapping.md)
- [Relevance baseline](docs/experiments/relevance-baseline.md)
- [Milestone 01 retrospective](docs/retrospectives/milestone-01-retro.md)

## Local Setup

Install dependencies:

```bash
pnpm install
```

Start OpenSearch and OpenSearch Dashboards:

```bash
docker compose up -d
```

Seed products:

```bash
pnpm search:seed
```

OpenSearch API uses `OPENSEARCH_HTTP_PORT` from `.env`.
OpenSearch Dashboards uses `OPENSEARCH_DASHBOARDS_PORT` from `.env`.

## Search Fields

- `title`
- `description`
- `category`
- `brand`

## Relevance Checks

TODO: add 3-5 example queries with expected top results.
