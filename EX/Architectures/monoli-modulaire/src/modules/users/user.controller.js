const userService = require("./user.service");

const order = (req, res) => {
    try {
        const { userId, menuId } = req.body;
        const result = userService.order(userId, menuId);

        if (result.error) {
            return res.status(result.status).send(result.message);
        }

        res.status(200).send(result.message);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur pour commander");
    }
};

module.exports = { order };