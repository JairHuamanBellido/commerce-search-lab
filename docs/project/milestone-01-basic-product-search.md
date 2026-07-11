# Milestone 01: Basic Product Search

## Goal

Create repeatable local product search over a seeded catalog.

## User Story

As a shopper, I can search products by text and narrow results by basic product attributes.

## Deliverables

- Local OpenSearch stack runs with `docker compose up -d`.
- Product index mapping exists.
- Seed script loads sample products.
- Search API queries OpenSearch.
- UI shows matching products.
- Relevance baseline documents expected results.

## Tasks

1. Verify Docker Compose setup.
2. Define product document shape.
3. Create OpenSearch mapping.
4. Add seed data.
5. Add ingest script.
6. Add search query.
7. Add basic UI.
8. Record relevance checks.

## Done When

- `docker compose up -d` starts OpenSearch and Dashboards.
- Seed command creates index and inserts products.
- App can query OpenSearch from local development.
- At least five baseline queries have expected top results.

