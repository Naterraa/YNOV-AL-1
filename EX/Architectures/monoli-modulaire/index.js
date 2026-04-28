const express = require("express");
const userRoutes = require("./src/modules/users/user.routes");
const walletRoutes = require("./src/modules/wallets/wallet.routes");
const menuRoutes = require("./src/modules/menus/menu.routes");

const app = express();
app.use(express.json());

app.use('/order', userRoutes);
app.use('/wallet', walletRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});