# Relevance Baseline

## Purpose

Track expected search results before tuning queries or mappings.

## Setup

- OpenSearch API: `http://127.0.0.1:9200`
- App: `http://127.0.0.1:5173`
- Index: `products`
- Dataset: seeded local catalog
- Search implementation: `src/infrastructure/opensearch-client.ts`
- UI implementation: `src/routes/+page.svelte`

## Query Shape Under Test

- Empty search uses `match_all`.
- Text search uses `multi_match`.
- Field boosts:
  - `title^3`
  - `brand^2`
  - `category^2`
  - `description`
- Facets use `terms` aggregations on `brand` and `category`.
- Selected facets use `terms` filters and combine with the current search term.
- Results use OpenSearch pagination with `from` and `size`.
- UI shows 10 products per page.

## Baseline Queries

| Query                 | Expected Top Result                                                         | Notes                                |
| --------------------- | --------------------------------------------------------------------------- | ------------------------------------ |
| `running shoes`       | Nike Pegasus Road Running Shoes or Adidas Ultraboost Running Shoes          | Should favor title/category matches. |
| `wireless headphones` | Sony WH-1000XM Wireless Headphones or Bose QuietComfort Wireless Headphones | Should favor exact product intent.   |
| `coffee maker`        | Breville Precision Coffee Maker or Ninja Hot and Iced Coffee Maker          | Should match title and description.  |
| `nike`                | Nike Pegasus Road Running Shoes                                             | Should match boosted brand field.    |
| `laptop backpack`     | Herschel Laptop Backpack or North Face Commuter Laptop Backpack             | Should handle multi-term query.      |

## Facet Checks

| Search Term | Selected Facet      | Expected Behavior                                               |
| ----------- | ------------------- | --------------------------------------------------------------- |
| `running`   | Brand: `Nike`       | Results stay related to running and only include Nike products. |
| `laptop`    | Category: `Bags`    | Results include laptop backpacks, not laptop computers.         |
| `coffee`    | Category: `Kitchen` | Results stay kitchen-focused.                                   |
| empty       | Brand: `Apple`      | Results include Apple products from initial catalog search.     |

## Observations

TODO: record actual top results from local OpenSearch after running `docker compose up -d`, `pnpm search:seed`, and `pnpm dev`.

## UI Behavior Notes

- Search term and selected facets are sent together in the same OpenSearch request.
- Changing the search term or selected facets resets pagination to page 1.
- Pagination controls use OpenSearch `from` and `size`; results are not sliced client-side.
