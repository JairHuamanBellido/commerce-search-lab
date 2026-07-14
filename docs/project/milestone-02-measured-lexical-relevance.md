# Milestone 02: Measured Lexical Relevance

## Goal

Improve product search through focused lexical relevance work observed from the SvelteKit app.

## User Story

As a search engineer, I can use the web app to inspect query behavior, spot ranking failures, and tune OpenSearch relevance carefully.

## Deliverables

- Baseline actual results are recorded for core commerce queries.
- Sort controls work for relevance, price, rating, and newest products.
- Relevance observations are documented manually from the web app.
- Field boost tuning is documented with before/after notes.
- Analyzer, synonym, and typo findings are documented for future milestones.

## Tasks

1. Record actual top 5 results for baseline queries.
2. Capture `_score` values for baseline results.
3. Add sort model to product search request types.
4. Add OpenSearch sort clauses for price, rating, and newest.
5. Add UI sort control that works with search, facets, and pagination.
6. Create a small manual query checklist.
7. Review query behavior through the SvelteKit app.
8. Run first field boost experiment and document before/after notes.
9. Test typo queries with current fuzziness behavior.
10. Draft analyzer and synonym ADR candidates.
11. Keep create-index and seed-data scripts as the only required search setup scripts.

## Query Set

Start with existing baseline queries:

- `running shoes`
- `wireless headphones`
- `coffee maker`
- `nike`
- `laptop backpack`

Add typo and intent checks:

- `nik shoes`
- `cofee maker`
- `wireles headphones`
- `apple`
- `laptop` with Category: `Bags`


## Done When

- Baseline document has actual top results, scores, and pass/fail notes.
- App supports relevance, price, rating, and newest sorting.
- Query behavior can be reviewed from the SvelteKit app after seeding OpenSearch.
- First tuning experiment shows before/after ranking notes.
- Roadmap identifies analyzer, synonym, and semantic search as later work.
