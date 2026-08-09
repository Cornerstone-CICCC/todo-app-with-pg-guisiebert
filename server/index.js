import "dotenv/config";
import express from "express";
import cors from "cors";
import { readFile } from "node:fs/promises";
import { query } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// create the table on boot so there's no manual setup step
await query(await readFile(new URL("./schema.sql", import.meta.url), "utf8"));

// GET /todos - list all
app.get("/todos", async (req, res) => {
  const { rows } = await query("SELECT * FROM todos ORDER BY id");
  res.json(rows);
});

// POST /todos - create
app.post("/todos", async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "task is required" });

  const { rows } = await query(
    "INSERT INTO todos (task) VALUES ($1) RETURNING *",
    [task]
  );
  res.status(201).json(rows[0]);
});

// PUT /todos/:id - edit text and/or toggle done
app.put("/todos/:id", async (req, res) => {
  const { task, done } = req.body;
  const { rows } = await query(
    `UPDATE todos
        SET task = COALESCE($1, task),
            done = COALESCE($2, done),
            updated_at = NOW()
      WHERE id = $3
      RETURNING *`,
    [task ?? null, done ?? null, req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "not found" });
  res.json(rows[0]);
});

// DELETE /todos/:id
app.delete("/todos/:id", async (req, res) => {
  const { rowCount } = await query("DELETE FROM todos WHERE id = $1", [
    req.params.id,
  ]);
  if (rowCount === 0) return res.status(404).json({ error: "not found" });
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
