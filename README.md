# Commerce Search Lab

Commerce Search Lab is a practical OpenSearch project for building e-commerce product search with SvelteKit and TypeScript. It focuses on catalog modeling, field mappings, lexical queries, facets, sorting, and basic relevance checks before expanding into advanced retrieval techniques.

## Current Milestone

A user can search a seeded product catalog through the SvelteKit app, view paginated products, and narrow results with brand/category facets backed by OpenSearch.

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
5. Add app search API client query.
6. Add ecommerce search UI with facets.
7. Add basic relevance checks.

## Documentation

- [Project brief](docs/project/project-brief.md)
- [Milestone 01 plan](docs/project/milestone-01-basic-product-search.md)
- [ADR 0001: Product search mapping](docs/adr/0001-product-search-mapping.md)
- [Relevance baseline](docs/experiments/relevance-baseline.md)

## Local Setup

Install dependencies:

```bash
pnpm install
```

Start OpenSearch and OpenSearch Dashboards:

```bash
docker compose up -d
```

Seed 100 products:

```bash
pnpm search:seed
```

Rebuild index with did-you-mean mapping and seed data:

```bash
pnpm search:rebuild
```

Run the app:

```bash
pnpm dev
```

OpenSearch API uses `OPENSEARCH_HTTP_PORT` from `.env`.
OpenSearch Dashboards uses `OPENSEARCH_DASHBOARDS_PORT` from `.env`.

## App Search Experience

- Initial page load queries OpenSearch and shows product cards.
- Search bar queries `title`, `brand`, `category`, and `description`.
- `title^3`, `brand^2`, and `category^2` make product identity fields count more than description matches.
- Brand and category facets use OpenSearch `terms` aggregations.
- Selecting one or more facets reruns search with the current search term.
- Pagination uses OpenSearch `from` and `size`, with 10 products per page.
- The app shows loading, empty, and error states.

## Search Fields

- `title`
- `description`
- `category`
- `brand`

## Implementation Evidence

- UI orchestration: `src/routes/+page.svelte`
- Search input: `src/lib/components/SearchBar.svelte`
- Facets: `src/lib/components/FacetsPanel.svelte`
- Product cards: `src/lib/components/ProductGrid.svelte`
- OpenSearch request builder: `src/infrastructure/opensearch-client.ts`
- Product/facet types: `src/lib/search/product.ts`

## Relevance Checks

See `docs/experiments/relevance-baseline.md`.
