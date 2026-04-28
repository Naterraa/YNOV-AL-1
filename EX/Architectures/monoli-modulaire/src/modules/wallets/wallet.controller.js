const walletService = require("./wallet.service");

const addSolde = (req, res) => {
    try {
        const userId = req.body.userId;
        const amount = req.body.amount || req.body.solde;

        const result = walletService.addSolde(userId, amount);

        if (result.error) {
            return res.status(result.status).send(result.message);
        }

        res.status(200).send(result.message);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur pour ajouter de l'argent");
    }
};

module.exports = { addSolde };