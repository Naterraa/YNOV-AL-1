### Créer un dossier 11_proxy_auth dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Vous développez une application d’administration d’un serveur.  
Certaines actions sensibles (ex. supprimer un utilisateur, accéder à des logs, redémarrer le serveur)  
ne doivent être accessibles **qu’aux utilisateurs authentifiés**.

Problème : le code client peut appeler directement les méthodes d’administration,  
sans passer par un contrôle d’accès.  
Résultat : il n’y a aucun moyen d’empêcher un utilisateur non autorisé d’exécuter des commandes critiques.

### Solution proposée :
Vous allez utiliser le **pattern Proxy** pour **contrôler l’accès à un objet réel**.  
Le proxy va vérifier les permissions avant de déléguer les appels à l’objet réel.

L’idée est de :

1. **Définir une interface `ServerAccess`** décrivant les actions d’administration (ex. `connect()`, `reboot()`, `deleteUser()`).

2. **Créer une classe concrète `RealServerAccess`** qui implémente réellement les opérations sur le serveur (simple log).

3. **Créer une classe `ProxyServerAccess`** qui :
   - Contient une référence vers le vrai serveur.
   - Vérifie l’identité ou le rôle de l’utilisateur avant d’autoriser certaines opérations (constructeur prend un string userRole et vérifie avec equalsIgnoreCase("ADMIN")).
   - Interdit les actions sensibles pour les utilisateurs non autorisés (simple log).

4. **Tester la mise en œuvre via une classe `Main`** :
   - Créer un proxy pour un administrateur et un utilisateur simple.
   - Montrer que les actions sensibles sont bloquées pour l’utilisateur non autorisé.

---

### Structure recommandée :

11_proxy_auth/
 ├─ ServerAccess.java  
 ├─ RealServerAccess.java  
 ├─ ProxyServerAccess.java  
 └─ Main.java