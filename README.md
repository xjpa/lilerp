# LilERP

A learning ERP for a fictional Philippine construction company. We build one business workflow at a time and explain the records behind it.

## Local setup

Requirements: Node.js 24 LTS, npm, and Docker Desktop with its engine running.

```sh
npm ci
cp .env.example .env
npm run db:up
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Open http://127.0.0.1:3000. PostgreSQL is bound to your computer only. `npm run db:down` stops the database without deleting its named volume. Do not remove that volume if you want to keep records.

This is a local learning application. Authentication and authorization arrive in milestone 2; keep this version on your own machine.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run build
```

## Learning notes

- [Commit 1: application foundations](docs/learning/01-foundations.md)
- [Commit 2: project records](docs/learning/02-project-records.md)
- [Commit 3: follow a project from browser to database](docs/learning/03-first-workflow.md)
- [Complete milestone and commit roadmap](docs/roadmap.md)

## Current milestone

Milestone 1 includes project creation, a database-backed register and detail page, duplicate-code errors, responsive layouts, demo data, and checks. No payments, API integrations, or financial calculations exist yet. CI is configured but has not run on GitHub until you push the repository.

`npm run db:seed` adds `PRJ-001` and `PRJ-002` if absent, without overwriting existing projects. It is safe to rerun. See the walkthrough for exercises and dependency-maintenance notes.

If PostgreSQL won't start, confirm Docker Desktop is running and port 5432 is free. If you change the exposed port in `compose.yaml`, update `DATABASE_URL` in your local `.env` to match. After schema updates, run `npm run db:generate` and `npm run db:migrate`. An empty database is supported; seeding is optional.
