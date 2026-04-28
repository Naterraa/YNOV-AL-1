Le service qui gère l'argent des étudiants est désormais séparé du service qui gère la nourriture
wallet-service (Port 3001) :
Gère la base de données des utilisateurs et leurs soldes.
POST /debit : Reçoit un userId et un amount. Vérifie si le solde est suffisant et déduit l'argent.
POST /add : Ajoute de l'argent.
menu-service (Port 3002) :
Gère le stock des plats.
GET /menu : Affiche les plats.
POST /order : Vérifie si le produit est en stock, Appelle le wallet-service pour tenter de débiter l'étudiant. Si le débit réussit, décrémente le stock et confirme la commande. Si le débit échoue, renvoie une erreur sans toucher au stock.
