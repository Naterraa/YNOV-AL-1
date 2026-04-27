const URL = "http://localhost:3000";

async function runTests() {
    console.log("Demarrage des tests de l'API Cantine...\n");

    try {
        // 1. Tester GET /menu
        console.log("--- Test: Recuperation du Menu ---");
        const menuRes = await fetch(`${URL}/menu`);
        const menu = await menuRes.json();
        console.log(`Menu recupere (${menu.length} plats trouves)`);
        console.table(menu);

        // 2. Tester POST /wallet/add
        console.log("\n--- Test: Ajout d'argent (User 1, +50) ---");
        const walletRes = await fetch(`${URL}/wallet/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 1, amount: 50 })
        });
        const walletMsg = await walletRes.text();
        console.log(`Reponse wallet: ${walletMsg}`);

        // 3. Tester POST /order (Cas passant)
        console.log("\n--- Test: Commande d'un plat (User 1 achete Plat 2) ---");
        const orderRes = await fetch(`${URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 1, menuId: 2 })
        });
        const orderMsg = await orderRes.text();

        if (orderRes.ok) {
            console.log(`Reponse commande: ${orderMsg}`);
        } else {
            console.log(`Echec commande: ${orderMsg}`);
        }

        // 4. Tester POST /order (Cas erreur : Solde insuffisant ou Stock)
        // Note : On tente d'acheter un plat tres cher ou sans stock pour verifier la logique
        console.log("\n--- Test: Commande avec erreur (User 1 achète Plat 3) ---");
        const errorOrderRes = await fetch(`${URL}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 1, menuId: 3 })
        });
        const errorOrderMsg = await errorOrderRes.text();
        console.log(`Reponse attendue (erreur): ${errorOrderMsg}`);

        // 5. Verification finale
        console.log("\n--- Verification finale du stock et du solde ---");
        const finalMenuRes = await fetch(`${URL}/menu`);
        const finalMenu = await finalMenuRes.json();
        console.table(finalMenu);

    } catch (error) {
        console.error("Erreur lors des tests :", error.message);
        console.log("Verifiez que le serveur est bien lance sur le port 3000.");
    }
}

runTests();