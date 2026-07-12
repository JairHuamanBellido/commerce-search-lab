# Roadmap

## Project Goal

Build an e-commerce product search lab using SvelteKit, TypeScript, and OpenSearch.

The project builds practical search engineering judgment through explicit mappings, seeded catalog data, lexical queries, facets, sorting, and basic relevance checks.

## Current Milestone: Basic Product Search

A user can search a seeded product catalog through OpenSearch using title, description, category, and brand, with explicit mappings, repeatable local setup, and basic relevance checks.

## Current Status

Completed:
- [x] SvelteKit + TypeScript project created.
- [x] OpenSearch Docker setup working.
- [x] Product mapping ADR created.
- [x] Seed data created.
- [x] Index creation and seed script created.

In progress:
- [ ] Basic search script.
- [ ] Relevance baseline document.

## Next Steps

1. Add `scripts/search-products.ts`.
2. Run sample queries:
   - `running shoes`
   - `nike`
   - `laptop`
3. Print top results with title, brand, category, and score.
4. Create `docs/experiments/relevance-baseline.md`.
5. Record expected vs actual top results.
6. Adjust field boosts only after baseline exists.

## Milestone Checklist

### 1. Local OpenSearch Setup

- [x] OpenSearch runs locally.
- [x] Health check works.
- [x] Setup documented.

### 2. Seeded Product Catalog

- [x] Product seed data exists.
- [x] Products include `id`, `title`, `description`, `category`, `brand`.
- [x] Seed script loads products into OpenSearch.

### 3. Product Mapping

- [x] Mapping ADR exists.
- [x] Mapping defines searchable fields.
- [ ] Exact-match fields exist for filters/facets.

### 4. Search Query

- [ ] Search script exists.
- [ ] Query searches `title`, `description`, `category`, and `brand`.
- [ ] Field boosts are explicit.
- [ ] Results are readable.

### 5. Relevance Baseline

- [ ] 3-5 test queries documented.
- [ ] Expected top results documented.
- [ ] Actual top results recorded.
- [ ] Pass/fail notes written.

### 6. README Update

- [ ] Setup command documented.
- [ ] Seed command documented.
- [ ] Search test command documented.
- [ ] Current milestone documented.

## Non-Goals For Current Milestone

- Semantic search.
- Embeddings.
- Recommendations.
- Personalization.
- Generative AI.
- Production infrastructure.

## Decision Log

- Product mapping: `docs/adr/0001-product-search-mapping.md`

## Experiments

- Baseline relevance: `docs/experiments/relevance-baseline.md`

## Done When

- OpenSearch starts locally.
- Product index can be recreated.
- Seed data loads repeatably.
- Search script returns useful results.
- Relevance baseline shows expected vs actual rankings.
- README explains how to run everything.