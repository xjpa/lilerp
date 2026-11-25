# Commit 3: your first full-stack workflow

## What you can do now

Your fictional company has a shared project register. You can create a job, open its details, and find it after refreshing or restarting the application. These are real PostgreSQL records, not browser storage or hardcoded dashboard data.

This is the foundation of an ERP. A project becomes the reference that later tells purchasing, the warehouse, and accounting which job a transaction belongs to. At this stage it is a project application; the connected ERP workflows come in later milestones.

## Follow a project through the system

1. Open the **New project** page. The browser displays a React form.
2. Enter the job name, code, customer, status, and site. HTML handles basic required-field checks.
3. Click **Create project**. React submits the named fields to a Next.js server function. The save button shows a pending state.
4. The server validates the fields with Zod. Codes are trimmed and uppercased. Invalid fields return errors and preserve your input.
5. The project service calls Prisma. Prisma's PostgreSQL adapter inserts a row into the `Project` table.
6. PostgreSQL enforces the unique-code constraint. It can reject a duplicate even if two people submit at the same instant.
7. On success, the server refreshes the register and redirects to a detail URL containing the project's internal ID.
8. The detail page queries the row by that ID. The register queries all projects and calculates its counts from those records.

The browser never receives the database connection credentials. The database is contacted by server code.

## Try it yourself

Start with the README setup commands. Optionally run `npm run db:seed` to add two fictional jobs; rerunning it preserves existing rows.

Create this project using an unused code:

| Field | Value |
| --- | --- |
| Project name | Mabini family residence |
| Project code | PRJ-003 |
| Customer | Mabini family |
| Status | Planned |
| Site name | Mabini job site |
| Site address | Quezon City, Metro Manila |

If you are using the checkout after browser verification, this example may already exist. Open it and create `PRJ-004` instead.

- Refresh the detail page. The project should still be there.
- Return to the register. Its counts should include the job.
- Submit another project with the same code in lowercase. Expect an error with your other fields preserved.
- Try a code containing spaces. Expect validation to reject it.
- Stop the application and restart it. The job should still exist.
- Stop PostgreSQL with `npm run db:down` and reload the register. Expect a connection error, not an empty company. Run `npm run db:up` and retry.
- Open Prisma Studio with `npm run db:studio` to inspect the same row directly. Avoid changing fields there during normal exercises because direct edits bypass application validation.

## What each record field means

The **ID** is a stable machine reference. The **code** is the readable business reference. The **status** describes the job, and the **timestamps** record when the row was created and last updated. Customer and site fields will become relationships to shared records in milestone 2.

An ERP will eventually have many records for the same job: a purchase order, delivery receipt, supplier bill, and payment. They remain distinct because each documents a different event. They will link through IDs instead of repeatedly copying a project name.

## Verification and limits

`npm test` checks normalization and invalid input. `npm run test:integration` creates temporary projects in the configured database and checks persistence and concurrent duplicate prevention, then removes only its own generated codes. Run integration tests against your local learning database.

This milestone has no authentication or financial transactions. The server binds to loopback for local use. We have not implemented changing a project's status, editing its details, or deleting it.

The initial dependency audit found advisories in the development tools. We upgraded Prisma and Vitest and added a narrow override for Prisma's Effect dependency to patched version `3.22.1` within the same major version. The final installation audit reported zero vulnerabilities. Recheck with `npm audit` when upgrading dependencies; remove the override when Prisma's upstream dependency includes the fix.

## Explain it in your own words

1. Why do we need both a project ID and a project code?
2. Why does the database enforce uniqueness if the server already validates the form?
3. Which process talks to PostgreSQL: the browser or the Next.js server?
4. How will a warehouse receipt know which construction project it belongs to?
5. Why should an unavailable database look different from a company with no projects?
