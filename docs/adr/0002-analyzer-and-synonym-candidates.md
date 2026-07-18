# ADR 0002: Analyzer And Synonym Candidates

## Status

Proposed

## Context

Milestone 2 added measured lexical relevance checks, sort controls, boost notes, typo checks, and phrase suggestions. Future mapping work should improve search behavior without turning every query change into intuition-only tuning.

Current search behavior:

- Product text search uses `multi_match` across `title`, `brand`, `category`, and `description`.
- Typo checks use `fuzziness: 'AUTO'`.
- The suggestion field uses a trigram shingle analyzer on copied product text.
- Facets and filters depend on exact `keyword` fields for `brand` and `category`.

## Analyzer Options

### Keep Standard Analyzer For Core Text

Use OpenSearch's standard analyzer for `title` and `description` until observed failures justify a custom analyzer.

Reason:

- It handles normal tokenization and lowercasing well enough for the seeded catalog.
- It keeps scores easier to reason about during early relevance experiments.
- It avoids mapping churn before more query evidence exists.

### Add Search-As-You-Type Field Later

Consider adding `search_as_you_type` or edge n-gram subfields for autocomplete behavior.

Use only when the UI needs prefix search such as `wire` matching `wireless` before full query submission.

Tradeoff:

- Better prefix matching.
- Larger index and more analyzer complexity.

### Keep Trigram Suggestion Field For Did-You-Mean

Keep the current `suggest.trigram` field for phrase suggestions.

Reason:

- It supports typo correction for `cofee maker` and `wireles headphones`.
- It separates correction behavior from ranking behavior.

### Avoid Stemming For Now

Do not add stemming in the next mapping change unless a clear plural/singular issue appears.

Reason:

- Product names often contain brand and model terms where aggressive stemming can hurt precision.
- Current test set does not show stemming as the main relevance blocker.

## Synonym Candidates

Start with narrow, commerce-specific synonyms only. Test one group at a time and record before/after results in the relevance baseline.

| Canonical Intent    | Candidate Synonyms                                                    | Test Query             |
| ------------------- | --------------------------------------------------------------------- | ---------------------- |
| wireless headphones | bluetooth headphones, noise canceling headphones, over ear headphones | `bluetooth headphones` |
| running shoes       | road running shoes, trainers, sneakers                                | `trainers`             |
| coffee maker        | drip coffee machine, coffee brewer, coffeemaker                       | `coffee brewer`        |
| laptop backpack     | computer backpack, notebook backpack, work backpack                   | `computer backpack`    |
| water bottle        | insulated bottle, stainless bottle, travel bottle                     | `insulated bottle`     |

## Decision

Do not change the production mapping yet. Keep current fuzziness and suggestion behavior, then run future analyzer or synonym experiments one change at a time.

## Consequences

- Milestone 2 stays focused on measured lexical relevance.
- Future synonym work has clear candidate groups and test queries.
- Analyzer changes remain tied to observed failures instead of broad tuning.
