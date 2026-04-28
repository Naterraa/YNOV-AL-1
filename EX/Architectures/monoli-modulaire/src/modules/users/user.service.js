const db = require("../../shared/db");

const order = (userId, menuId) => {
    const processOrder = db.transaction((userId, menuId) => {
        const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
        const menu = db.prepare("SELECT * FROM menus WHERE id = ?").get(menuId);

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
        db.prepare("UPDATE menus SET stock = ? WHERE id = ?").run(menu.stock - 1, menuId);
        db.prepare("INSERT INTO orders (userId, menuId) VALUES (?, ?)").run(userId, menuId);

        return { error: false, message: "Commande réussie" };
    });

    return processOrder(userId, menuId);
};

module.exports = { order };