# Commit 2: project records

**Business idea:** a project identifies one construction job. Its stable internal ID will connect purchases and costs to that job later. Its readable code is for people. The database enforces unique codes, including when two requests arrive together.

**Engineering idea:** the form sends values to a server function. Zod validates them on the server. The project service validates at its boundary too, then Prisma inserts a PostgreSQL row. After a successful insert, Next.js refreshes the register and redirects to the new detail page. Database errors never become a fake successful save.

The form can reject incomplete input in the browser, but browser checks can be bypassed. The server is responsible for enforcing rules. Codes are trimmed and uppercased so `prj-003` and `PRJ-003` identify the same code.

**Exercise:** create `PRJ-003`, refresh its detail page, and find it in the register. Try the same code in lowercase: you should get a field error and keep your entered values. Try an invalid code with spaces.

**Limits:** customers and sites are text fields for now. Status describes the project's current position; there are no status-transition workflows yet. No login, editing, deleting, financial records, or public deployment is included in milestone 1.
