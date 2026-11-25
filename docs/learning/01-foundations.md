# Commit 1: application foundations

**Business idea:** an ERP stores shared business records. Our first shared record will be a construction project.

**Engineering idea:** the browser shows pages supplied by Next.js. Server code will use Prisma to read and write PostgreSQL. Docker runs that database in a separate process. Docker's named volume preserves records when the container stops.

The repository deliberately starts as one application and one database. There are no outside service integrations.

**Exercise:** start the app, open its page, stop the database with `npm run db:down`, and start it again with `npm run db:up`. The application and database have separate lifecycles.

**Limit:** the landing page does not query the database yet. Project records arrive in the next commit.
