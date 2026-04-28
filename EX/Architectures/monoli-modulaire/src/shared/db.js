const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../../data.db'));

db.exec("CREATE TABLE IF NOT EXISTS menus (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, stock INTEGER)");
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, solde REAL)");
db.exec("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, menuId INTEGER)");

const menuCount = db.prepare("SELECT COUNT(*) FROM menus").get().count;
const userCount = db.prepare("SELECT COUNT(*) FROM users").get().count;

if (menuCount === 0) {
    db.exec("INSERT INTO menus (name, price, stock) VALUES ('Plat 1', 10, 5), ('Plat 2', 20, 3), ('Plat 3', 300, 1)");
}

if (userCount === 0) {
    db.exec("INSERT INTO users (name, solde) VALUES ('Utilisateur 1', 100), ('Utilisateur 2', 200), ('Utilisateur 3', 300)");
}

module.exports = db;