const db = require("../../shared/db");

const getAllMenus = () => {
    const statement = db.prepare("SELECT * FROM menus");
    return statement.all();
};

module.exports = { getAllMenus };