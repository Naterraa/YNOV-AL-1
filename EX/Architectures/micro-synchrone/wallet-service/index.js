const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

app.post("/add-solde", (req, res) => {
    try {
        const { userId, solde } = req.body;
        const statement = db.prepare("UPDATE users SET solde = solde + ? WHERE id = ?");
        statement.run(solde, userId);
        res.status(200).send("Solde ajouté avec succès");
    } catch (error) {
        res.status(500).send("Erreur pour ajouter du solde");
    }
});

app.get("/all-users", (req, res) => {
    try {
        const users = db.prepare("SELECT * FROM users").all();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send("Erreur pour récupérer les utilisateurs");
    }
})

app.post("/debit", (req, res) => {
    try {
        const { userId, amount } = req.body;
        const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        if (user.solde < amount) {
            return res.status(400).send("Solde insuffisant");
        }
        const statement = db.prepare("UPDATE users SET solde = solde - ? WHERE id = ?");
        statement.run(amount, userId);
        res.status(200).send("Solde débité avec succès");
    } catch (error) {
        res.status(500).send("Erreur pour débiter le solde");
    }
});

app.listen(3001, () => {
    console.log("Wallet service running on port 3001");
});