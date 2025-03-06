const Database = require("better-sqlite3");
const db = new Database("users.db");

// Create users table if not exists
db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`
).run();

module.exports = db;
