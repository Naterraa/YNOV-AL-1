const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "menu.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS menus (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    price REAL,
    stock INTEGER DEFAULT 0
  );
  
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    userId INTEGER,
    menuId INTEGER,
    status TEXT
  );
`);

const menusCount = db.prepare('SELECT COUNT(*) as count FROM menus').get().count;
if (menusCount === 0) {
  const insertMenu = db.prepare('INSERT INTO menus (name, price, stock) VALUES (?, ?, ?)');
  insertMenu.run('Plat 1', 10, 5);
  insertMenu.run('Plat 2', 20, 3);
  insertMenu.run('Plat 3', 300, 1);
}

module.exports = db;
