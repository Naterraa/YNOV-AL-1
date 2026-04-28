const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "wallet.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    solde REAL DEFAULT 0
  );
`);

const usersCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
if (usersCount === 0) {
  const insertUser = db.prepare('INSERT INTO users (name, solde) VALUES (?, ?)');
  insertUser.run('Utilisateur 1', 100);
  insertUser.run('Utilisateur 2', 200);
  insertUser.run('Utilisateur 3', 300);
}

module.exports = db;
