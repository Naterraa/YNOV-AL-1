const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "items.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    stock INTEGER
  );
`);

const itemsCount = db.prepare('SELECT COUNT(*) as count FROM items').get().count;
if (itemsCount === 0) {
  const insertItem = db.prepare('INSERT INTO items (name, price, stock) VALUES (?, ?, ?)');
  insertItem.run('Épée en bois', 100, 10);
  insertItem.run('Bouclier basique', 150, 5);
  insertItem.run('Potion de soin', 50, 20);
}

module.exports = db;
