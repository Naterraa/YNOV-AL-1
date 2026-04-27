const express = require("express");
const Databases = require('better-sqlite3');

const app = express()
const db = new Databases('database.db');
app.use(express.json());

// Ajout de données fictives 
const menu = [
    {
        id: 1,
        name: "Plat 1",
        price: 10,
        stock: 5
    },
    {
        id: 2,
        name: "Plat 2",
        price: 20,
        stock: 3
    },
    {
        id: 3,
        name: "Plat 3",
        price: 300,
        stock: 1
    }
];

const users = [
    {
        id: 1,
        name: "Utilisateur 1",
        solde: 100
    },
    {
        id: 2,
        name: "Utilisateur 2",
        solde: 200
    },
    {
        id: 3,
        name: "Utilisateur 3",
        solde: 300
    }
];

const orders = [];

db.prepare("CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY, name TEXT, price INTEGER, stock INTEGER)").run();
db.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, solde INTEGER)").run();
db.prepare("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, userId INTEGER, menuId INTEGER)").run();

menu.forEach(item => {
    db.prepare("INSERT OR IGNORE INTO menu (id, name, price, stock) VALUES (?, ?, ?, ?)").run(item.id, item.name, item.price, item.stock);
});

users.forEach(item => {
    db.prepare("INSERT OR IGNORE INTO users (id, name, solde) VALUES (?, ?, ?)").run(item.id, item.name, item.solde);
});

// Routes

app.get("/menu", (req, res) => {
    try {
        const sql = "SELECT * FROM menu"
        const result = db.prepare(sql).all()
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur pour récupérer les menus");
    }
});

app.post("/order", (req, res) => {
    try {
        const { userId, menuId } = req.body;

        const processOrder = db.transaction((userId, menuId) => {
            const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
            const menu = db.prepare("SELECT * FROM menu WHERE id = ?").get(menuId);

            if (!user || !menu) {
                return { error: true, status: 404, message: "Utilisateur ou plat non trouvé" };
            }
            if (user.solde < menu.price) {
                return { error: true, status: 400, message: "Solde insuffisant" };
            }
            if (menu.stock <= 0) {
                return { error: true, status: 400, message: "Stock insuffisant" };
            }

            db.prepare("UPDATE users SET solde = ? WHERE id = ?").run(user.solde - menu.price, userId);
            db.prepare("UPDATE menu SET stock = ? WHERE id = ?").run(menu.stock - 1, menuId);
            db.prepare("INSERT INTO orders (userId, menuId) VALUES (?, ?)").run(userId, menuId);

            return { error: false, message: "Commande réussie" };
        });

        const result = processOrder(userId, menuId);
        if (result.error) {
            return res.status(result.status).send(result.message);
        }

        res.send(result.message);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur pour commander");
    }
});

app.post("/wallet/add", (req, res) => {
    try {
        const { userId, amount } = req.body;

        const addFunds = db.transaction((userId, amount) => {
            const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
            if (!user) {
                return { error: true, status: 404, message: "Utilisateur non trouvé" };
            }
            db.prepare("UPDATE users SET solde = ? WHERE id = ?").run(user.solde + amount, userId);
            return { error: false, message: "Argent ajouté avec succès" };
        });

        const result = addFunds(userId, amount);
        if (result.error) {
            return res.status(result.status).send(result.message);
        }

        res.send(result.message);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur pour ajouter de l'argent");
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});