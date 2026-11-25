# LilERP

A learning ERP for a fictional Philippine construction company. We build one business workflow at a time and explain the records behind it.

## Local setup

Requirements: Node.js 22+, npm, and Docker Desktop with its engine running.

```sh
npm ci
cp .env.example .env
npm run db:up
npm run db:generate
npm run db:migrate
npm run dev
```

Open http://127.0.0.1:3000. PostgreSQL is bound to your computer only. `npm run db:down` stops the database without deleting its named volume. Do not remove that volume if you want to keep records.

This is a local learning application. Authentication and authorization arrive in milestone 2; keep this version on your own machine.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Learning notes

- [Commit 1: application foundations](docs/learning/01-foundations.md)
- [Commit 2: project records](docs/learning/02-project-records.md)
