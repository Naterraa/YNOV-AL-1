const db = require("../../shared/db");

const addSolde = (userId, amount) => {
    const addFunds = db.transaction((userId, amount) => {
        const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
        if (!user) {
            return { error: true, status: 404, message: "Utilisateur non trouvé" };
        }
        db.prepare("UPDATE users SET solde = ? WHERE id = ?").run(user.solde + amount, userId);
        return { error: false, message: "Argent ajouté avec succès" };
    });

    return addFunds(userId, amount);
};

module.exports = { addSolde };