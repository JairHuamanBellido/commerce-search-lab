# Project Brief: Commerce Search Lab

## Purpose

Build a practical e-commerce search lab with SvelteKit, TypeScript, Docker, and OpenSearch.

## First Outcome

User can search a seeded product catalog through the SvelteKit app using title, description, category, and brand, narrow results with brand/category facets, and browse paginated results.

## Scope

- Repeatable local OpenSearch and OpenSearch Dashboards setup.
- Product index mapping.
- Seeded catalog data.
- Basic lexical search.
- Brand/category facets.
- Pagination with 10 products per page.
- Simple relevance checks.

## Current App Evidence

- Initial results, search term state, selected facets, pagination, loading/error handling: `src/routes/+page.svelte`
- OpenSearch `multi_match`, field boosts, facet filters, and pagination: `src/infrastructure/opensearch-client.ts`
- Search UI: `src/lib/components/SearchBar.svelte`
- Facet UI: `src/lib/components/FacetsPanel.svelte`
- Product result UI: `src/lib/components/ProductGrid.svelte`

## Non-Goals

- Semantic search.
- Embeddings.
- Recommendations.
- Personalization.
- Generative AI.
- Production infrastructure.

## Local Endpoints

- OpenSearch API: `http://127.0.0.1:9201`
- OpenSearch Dashboards: `http://127.0.0.1:5602`
