# Roadmap

## Project Goal

Build an e-commerce product search lab using SvelteKit, TypeScript, and OpenSearch.

The project builds practical search engineering judgment through explicit mappings, seeded catalog data, lexical queries, facets, sorting, and basic relevance checks.

## Current Milestone: Basic Product Search

A user can search a seeded product catalog through the SvelteKit app, view paginated results, and narrow results with brand/category facets backed by OpenSearch.

## Current Status

Completed:

- [x] SvelteKit + TypeScript project created.
- [x] OpenSearch Docker setup working.
- [x] Product mapping ADR created.
- [x] Seed data created.
- [x] Index creation and seed script created.
- [x] App search API client created.
- [x] Ecommerce search page created.
- [x] Search bar searches product text fields.
- [x] Brand/category facets search with the current search term.
- [x] Pagination shows 10 products per page.
- [x] Loading, empty, and error states added.

In progress:

- [x] Relevance baseline document.
- [ ] Baseline actual results recorded from local OpenSearch.

## Next Steps

1. Run the app against seeded OpenSearch.
2. Test sample queries:
   - `running shoes`
   - `nike`
   - `laptop`
   - `coffee maker`
   - `laptop backpack`
3. Record expected vs actual top results in `docs/experiments/relevance-baseline.md`.
4. Test facet combinations, especially brand + category with a search term.
5. Smoke test pagination with search terms and facet selections.
6. Add sort controls for price/rating/newest.
7. Adjust field boosts only after baseline evidence exists.

## Milestone Checklist

### 1. Local OpenSearch Setup

- [x] OpenSearch runs locally.
- [x] Health check works.
- [x] Setup documented.

### 2. Seeded Product Catalog

- [x] Product seed data exists with 100 products.
- [x] Products include `id`, `title`, `description`, `category`, `brand`.
- [x] Seed script loads products into OpenSearch.

### 3. Product Mapping

- [x] Mapping ADR exists.
- [x] Mapping defines searchable fields.
- [x] Exact-match fields exist for filters/facets.

### 4. Search Query

- [x] App search client exists.
- [x] Query searches `title`, `description`, `category`, and `brand`.
- [x] Field boosts are explicit.
- [x] Results are readable.

### 5. Search UI

- [x] Initial results load on page mount.
- [x] Search bar submits normalized user text.
- [x] Facets show brand/category counts.
- [x] Multiple facet selections are supported.
- [x] Search term and selected facets are sent together.
- [x] Pagination shows 10 products per page.
- [x] Pagination resets to page 1 after search or filter changes.
- [x] Loading, empty, and error states exist.

### 6. Relevance Baseline

- [x] 3-5 test queries documented.
- [x] Expected top results documented.
- [ ] Actual top results recorded.
- [ ] Pass/fail notes written.

### 7. README Update

- [x] Setup command documented.
- [x] Seed command documented.
- [x] App run command documented.
- [x] Current milestone documented.

## Non-Goals For Current Milestone

- Semantic search.
- Embeddings.
- Recommendations.
- Personalization.
- Generative AI.
- Production infrastructure.

## Decision Log

- Product mapping: `docs/adr/0001-product-search-mapping.md`
- App search lives in `src/infrastructure/opensearch-client.ts`, not a standalone search script.
- Search UI lives in `src/routes/+page.svelte` with components in `src/lib/components`.
- Pagination uses OpenSearch `from` and `size` rather than client-side slicing.

## Experiments

- Baseline relevance: `docs/experiments/relevance-baseline.md`

## Done When

- OpenSearch starts locally.
- Product index can be recreated.
- Seed data loads repeatably.
- App returns useful search results.
- Facet selections update app results with the current search term.
- Pagination returns 10 products per page.
- Relevance baseline shows expected vs actual rankings.
- README explains how to run everything.
