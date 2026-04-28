Reprendre l’exercice précedent pour basculer vers une architecture plus modulaire.
Contraintes de structure :
Séparation stricte : Interdiction d'avoir de la logique métier dans les routes.
Dossier services : Contient uniquement la logique pure (calculs, vérification solde/stock). Pas d'objets req ou res.
Dossier controllers : Gère uniquement les entrées/sorties HTTP. Il appelle le service et renvoie les statuts (200, 400, 404).
Dossier routes : Définit les points d'entrée et les lie aux contrôleurs.
Fichier app.js : Ne sert plus qu'à configurer Express et importer les routes.
