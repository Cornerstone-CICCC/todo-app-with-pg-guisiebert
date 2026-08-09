# Todo App with Postgres

## How to run with docker

```bash
docker compose up -d          # Postgres on port 5434
cd server && npm install && npm start   # API on http://localhost:3001
cd web && npm install && npm run dev    # UI  on http://localhost:4321
```

The `todos` table is created automatically on server start (`server/schema.sql`).

### Endpoints

| method | path | body |
|---|---|---|
| GET | `/todos` | — |
| POST | `/todos` | `{ "task": "Buy groceries" }` |
| PUT | `/todos/:id` | `{ "task": "..." }` and/or `{ "done": true }` |
| DELETE | `/todos/:id` | — |

---

## Assignment brief

Build a full-stack **Todo app**: a Node.js/Express API backed by a **PostgreSQL**
database (via the `pg` library) with an **Astro** front end — the same stack we
used in the class demo.

## Suggested workflow
1. **Set up the database** — create a Postgres database and a `todos` table.
2. **Test the connection** — make sure your API can connect to Postgres and run a query.
3. **Build the API + test with Postman** — implement your CRUD endpoints and verify
   each one in Postman before touching the UI.
4. **Attach the Astro front end** — wire the UI up to your working endpoints.

## Assignment objective
- Build an API server connected to a PostgreSQL database.
- Users can **add**, **edit**, **delete**, and **mark done** todo items (full CRUD).
- Store all data in Postgres — name your database and tables whatever you like.
- Use a **pg Pool** connection (as shown in the demo).
- Astro front end → Express/Node back end.

## Suggested data model
A `todos` table, for example (name it your own way):

| column | type | notes |
|---|---|---|
| id | `SERIAL PRIMARY KEY` | |
| task | `TEXT NOT NULL` | |
| done | `BOOLEAN DEFAULT false` | |
| created_at | `TIMESTAMPTZ DEFAULT NOW()` | optional to show in the UI |
| updated_at | `TIMESTAMPTZ DEFAULT NOW()` | optional to show in the UI |

## Example UI (use as a reference)

![Alt text](./docs/1.png)

Users should be able to mark a task as done or edit it:

![Alt text](./docs/2.png)

## Notes
- Focus on the **Node–Postgres integration** with the `pg` library and CRUD operations.
- Build and test your endpoints with **Postman** first, then build the UI.
