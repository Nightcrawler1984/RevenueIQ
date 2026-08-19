# Database

Schema for replacing `src/data/fixtures.js` with real data, defined with
[Drizzle ORM](https://orm.drizzle.team/) against Postgres.

## Setup

1. Provision a Postgres database (Neon, Vercel Postgres, Supabase — any
   Postgres 13+ works; `gen_random_uuid()` is built into core from v13).
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. Apply the migration: `npm run db:migrate`.

## Workflow

- `db/schema.js` is the source of truth for every table.
- After changing `schema.js`, run `npm run db:generate` to produce a new SQL
  migration under `drizzle/migrations/`. Never hand-edit an already-applied
  migration file — add a new one instead.
- `npm run db:migrate` applies pending migrations to `DATABASE_URL`.
- `npm run db:studio` opens Drizzle Studio to browse data locally.

## Notes

- No table stores a real secret value. `integration_connections.secret_ref`
  is a *name* (e.g. `APOLLO_API_KEY`) resolved from environment variables /
  a secrets manager at request time, server-side only.
- `db/client.js` exports a ready-to-use `db` instance for API routes /
  serverless functions once those are added.
- See the fixture-to-table mapping comments inline in `schema.js` for how
  each table replaces a specific export from `src/data/fixtures.js`.
