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

Recorded after running `pnpm search:seed` against local OpenSearch.

## Actual Top Results

| Query                 | Rank | Product                                | Score  | Pass/Fail Note                                                         |
| --------------------- | ---- | -------------------------------------- | ------ | ---------------------------------------------------------------------- |
| `running shoes`       | 1    | Adidas Ultraboost Running Shoes        | 7.6492 | PASS: expected running shoes rank at top.                              |
| `running shoes`       | 2    | Nike Pegasus Road Running Shoes        | 6.9562 | PASS: expected product appears in top 2.                               |
| `running shoes`       | 3    | Brooks Ghost Stability Running Shoes   | 6.9562 | PASS: relevant running shoe.                                           |
| `wireless headphones` | 1    | Bose QuietComfort Wireless Headphones  | 8.6368 | PASS: expected wireless headphones rank at top.                        |
| `wireless headphones` | 2    | Sony WH-1000XM Wireless Headphones     | 7.8543 | PASS: expected product appears in top 2.                               |
| `coffee maker`        | 1    | Breville Precision Coffee Maker        | 9.3345 | PASS: expected product ranks first.                                    |
| `coffee maker`        | 2    | Ninja Hot and Iced Coffee Maker        | 7.7836 | PASS: expected product appears in top 2.                               |
| `coffee maker`        | 3    | Instant Pot Cold Brew Maker            | 2.7569 | PASS: relevant coffee maker result.                                    |
| `nike`                | 1    | Nike Travel Pants                      | 4.7962 | FAIL: brand match works, but expected Nike Pegasus did not rank first. |
| `nike`                | 2    | Nike Metcon Training Shoes             | 4.3184 | PASS: Nike brand result.                                               |
| `nike`                | 3    | Nike Pegasus Road Running Shoes        | 3.9272 | FAIL: expected product appears, but below other Nike products.         |
| `nike`                | 4    | Nike Dri-FIT Running Shirt             | 3.9272 | PASS: Nike brand result.                                               |
| `nike`                | 5    | Timbuk2 Classic Commuter Messenger Bag | 1.3733 | FAIL: non-Nike result appears due description match.                   |
| `laptop backpack`     | 1    | Herschel Laptop Backpack               | 8.6736 | PASS: expected product ranks first.                                    |
| `laptop backpack`     | 2    | North Face Commuter Laptop Backpack    | 7.1020 | PASS: expected product appears in top 2.                               |
| `laptop backpack`     | 3    | Herschel Roll-Top Backpack             | 2.2577 | PASS: relevant backpack fallback.                                      |

Some queries return fewer than 5 results because `operator: 'and'` requires all query terms to match.

## Actual Facet Check Results

| Search Term | Selected Facet      | Actual Result Summary                                                                 | Pass/Fail Note                                         |
| ----------- | ------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `running`   | Brand: `Nike`       | 2 results: Nike Pegasus Road Running Shoes, Nike Dri-FIT Running Shirt                | PASS: results are Nike and running-related.            |
| `laptop`    | Category: `Bags`    | 5 results, led by Herschel Laptop Backpack and North Face Commuter Laptop Backpack    | PASS: results stay in Bags and avoid laptop computers. |
| `coffee`    | Category: `Kitchen` | 4 results, led by Breville Precision Coffee Maker and Ninja Hot and Iced Coffee Maker | PASS: results stay kitchen-focused.                    |
| empty       | Brand: `Apple`      | 5 Apple products from initial catalog search                                          | PASS: empty search plus brand facet works.             |

## UI Behavior Notes

- Search term and selected facets are sent together in the same OpenSearch request.
- Changing the search term or selected facets resets pagination to page 1.
- Pagination controls use OpenSearch `from` and `size`; results are not sliced client-side.
