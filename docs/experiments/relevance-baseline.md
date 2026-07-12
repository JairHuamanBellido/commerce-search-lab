# Relevance Baseline

## Purpose

Track expected search results before tuning queries or mappings.

## Setup

- OpenSearch API: `http://127.0.0.1:9200`
- Index: `products`
- Dataset: seeded local catalog

## Baseline Queries

| Query | Expected Top Result | Notes |
| --- | --- | --- |
| `running shoes` | TODO | Should favor title/category matches. |
| `wireless headphones` | TODO | Should favor exact product intent. |
| `coffee maker` | TODO | Should match title and description. |
| `nike` | TODO | Should match brand. |
| `laptop backpack` | TODO | Should handle multi-term query. |

## Observations

TODO: record results after seed data exists.

