# Milestone 01: Basic Product Search

## Goal

Create repeatable local product search over a seeded catalog.

## User Story

As a shopper, I can search products by text and narrow results by basic product attributes.

## Deliverables

- Local OpenSearch stack runs with `docker compose up -d`.
- Product index mapping exists.
- Seed script loads sample products.
- App search client queries OpenSearch.
- UI shows initial and matching products.
- UI lets shoppers filter by brand/category facets.
- UI paginates product results with 10 products per page.
- Relevance baseline documents expected results.

## Tasks

1. Verify Docker Compose setup.
2. Define product document shape.
3. Create OpenSearch mapping.
4. Add seed data.
5. Add ingest script.
6. Add search query.
7. Add basic UI.
8. Add facet filtering.
9. Add pagination.
10. Record relevance checks.

## App Behavior

- Initial load uses a `match_all` query and shows 10 products per page.
- Search uses `multi_match` across `title`, `brand`, `category`, and `description`.
- Field boosts are explicit: `title^3`, `brand^2`, `category^2`, and `description`.
- Brand/category facets come from OpenSearch `terms` aggregations.
- Selected facets become OpenSearch `terms` filters and stay combined with the current search term.
- Pagination sends OpenSearch `from` and `size` values, and resets to page 1 after search or filter changes.
- The page handles loading, empty results, stale responses, and OpenSearch errors.

## Implementation Evidence

- `src/routes/+page.svelte` owns search term, selected facets, loading, total, products, and error state.
- `src/routes/+page.svelte` owns pagination state and renders page controls.
- `src/infrastructure/opensearch-client.ts` builds the OpenSearch query and parses hits/aggregations.
- `src/infrastructure/opensearch-client.ts` supports OpenSearch pagination with `from` and `size`.
- `src/lib/components/SearchBar.svelte` renders the search form.
- `src/lib/components/FacetsPanel.svelte` renders brand/category facet checkboxes.
- `src/lib/components/ProductGrid.svelte` renders results, skeletons, and empty state.
- `src/lib/search/product.ts` defines product, facet, filter, and search result types.

## Done When

- `docker compose up -d` starts OpenSearch and Dashboards.
- Seed command creates index and inserts products.
- App can query OpenSearch from local development.
- Searching text updates product results.
- Selecting one or more facets updates product results with the current search term.
- Results show 10 products per page with previous/next and page number controls.
- At least five baseline queries have expected top results.
