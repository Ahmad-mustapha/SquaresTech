const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.join(__dirname, "database.db"));

// Create Members table
db.prepare(`
  CREATE TABLE IF NOT EXISTS members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL
  )
`).run();

// Create Tasks table
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    memberId TEXT,
    FOREIGN KEY(memberId) REFERENCES members(id)
  )
`).run();

module.exports = db;