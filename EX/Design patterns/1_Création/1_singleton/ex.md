### Créer un dossier 1_singleton dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :

Dans une application de gestion, plusieurs classes créent chacune leur propre connexion à la base de données.
Résultat : des ressources sont gaspillées, et les différents modules ne partagent pas le même état, ce qui provoque des incohérences dans les données.

### Solution proposée :

Vous allez utiliser le pattern Singleton pour garantir qu’il n’existe qu’une seule instance de la connexion.

L’idée est de :

1. Créer une classe DatabaseConnection qui empêche la création multiple d’instances.
2. Fournir une méthode d’accès globale (getInstance()) qui renvoie toujours la même connexion.
3. Tester la mise en œuvre via une classe Main : appeler plusieurs fois getInstance() et vérifier que les références obtenues pointent vers le même objet.

On pourra simuler la connexion par une methode getConnection appartenant à DatabaseConnection qui retourne "Connexion à la base de données initialisée."