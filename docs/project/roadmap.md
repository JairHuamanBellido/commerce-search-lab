# Roadmap

## Project Goal

Build an e-commerce product search lab using SvelteKit, TypeScript, and OpenSearch.

The project builds practical search engineering judgment through explicit mappings, seeded catalog data, lexical queries, facets, sorting, and basic relevance checks.

## Current Milestone: Measured Lexical Relevance

A developer can improve search quality from the SvelteKit app by checking real query behavior, sorting results, and documenting relevance observations manually.

## Current Status

Milestone 1 completed:

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
- [x] Baseline actual top results and scores recorded.
- [x] Baseline pass/fail notes written.

In progress:

- [x] Add sort controls for price, rating, and newest.
- [x] Document relevance observations from the web app.

## Next Steps

1. Record actual top 5 results and pass/fail notes for baseline queries in `docs/experiments/relevance-baseline.md`.
2. Add sort controls for price ascending, price descending, rating descending, and newest.
3. Use the SvelteKit app to review fixed queries and note ranking observations manually.
4. Tune field boosts one change at a time only after visible app behavior shows a ranking issue.
5. Add typo checks for `nik shoes`, `cofee maker`, and `wireles headphones`.
6. Draft an analyzer and synonym ADR for future mapping changes.
7. Keep create-index and seed-data scripts as the only project scripts needed for search setup.

## Milestone 2 Checklist

### 1. Baseline Completion

- [x] Actual top results are recorded for each baseline query.
- [x] Search scores are captured for top results.
- [x] Pass/fail notes explain ranking mismatches.

### 2. Sort Controls

- [x] Sort by relevance remains the default.
- [x] Sort by price ascending works.
- [x] Sort by price descending works.
- [x] Sort by rating descending works.
- [x] Sort by newest works.
- [x] Sort state works with search terms, facets, and pagination.

### 3. Web App Relevance Review

- [x] Fixed query checklist exists.
- [x] Query results are reviewed through the SvelteKit app.
- [x] Notes capture expected products, actual products, and ranking issues.
- [x] No extra evaluation script is required for this milestone.

### 4. Lexical Ranking Experiments

- [x] First boost tuning experiment is documented.
- [x] Before/after ranking changes are checked through the app.
- [x] Query changes are based on observed search behavior, not intuition-only.

### 5. OpenSearch IR Learning

- [ ] Typo behavior is tested with fuzziness enabled.
- [ ] Analyzer options are documented.
- [ ] Synonym candidates are documented.
- [ ] Explain API remains optional for deeper debugging.

## Milestone 1 Checklist

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
- [x] Actual top results recorded.
- [x] Pass/fail notes written.

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
- Milestone 2 plan: `docs/project/milestone-02-measured-lexical-relevance.md`

## Done When

- OpenSearch starts locally.
- Product index can be recreated.
- Seed data loads repeatably.
- App returns useful search results.
- Facet selections update app results with the current search term.
- Pagination returns 10 products per page.
- Relevance baseline shows expected vs actual rankings.
- README explains how to run everything.
