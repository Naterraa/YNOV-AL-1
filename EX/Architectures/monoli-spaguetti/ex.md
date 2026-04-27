Créer une API Express pour une cantine :
Utilisateurs : des étudiants qui ont un solde (argent).
Menu : Une liste de plats avec un prix et un stock.
Commandes : Quand un étudiant achète un plat, on vérifie son solde, on décrémente le stock, et on enregistre la transaction
Suivre les contraintes suivantes : 
Tout dans app.js ou index.js
La logique est directement dans les routes
Ni service ni contrôleur
La route commande manipule l’objet utilisateur et menu
GET /menu voir les plats et stock
POST /order : Vérifier le stock, vérifier le solde de l'étudiant, déduire l'argent et réduire le stock
POST /wallet/add : Ajouter de l'argent sur le compte.
