const menuService = require("./menu.service");

const getMenus = (req, res) => {
    try {
        const menus = menuService.getAllMenus();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMenus };