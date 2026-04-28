const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "players.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudo TEXT UNIQUE,
    gems INTEGER DEFAULT 0
  );
  
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    playerId INTEGER,
    itemId INTEGER,
    status TEXT
  );
`);

const playersCount = db.prepare('SELECT COUNT(*) as count FROM players').get().count;
if (playersCount === 0) {
  const insertPlayer = db.prepare('INSERT INTO players (pseudo, gems) VALUES (?, ?)');
  insertPlayer.run('Joueur1', 200);
  insertPlayer.run('Joueur2', 50);
}

module.exports = db;
