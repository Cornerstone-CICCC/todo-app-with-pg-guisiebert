CREATE TABLE IF NOT EXISTS todos (
  id         SERIAL PRIMARY KEY,
  task       TEXT NOT NULL,
  done       BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
