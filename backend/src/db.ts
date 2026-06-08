import Database from 'better-sqlite3';
import path from 'path';

// Connect to SQLite DB file
const dbPath = path.resolve(__dirname, '../../savegame.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Initialize database schema
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS saves (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    state TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Helper to get save state
export const getSaveState = () => {
  const row = db.prepare('SELECT state FROM saves WHERE id = 1').get() as { state: string } | undefined;
  if (row) {
    return JSON.parse(row.state);
  }
  return null;
};

// Helper to update save state
export const saveGameState = (state: any) => {
  const jsonState = JSON.stringify(state);
  const info = db.prepare(`
    INSERT INTO saves (id, state, updated_at) 
    VALUES (1, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET 
      state = excluded.state,
      updated_at = CURRENT_TIMESTAMP;
  `).run(jsonState);
  return info;
};

export default db;
