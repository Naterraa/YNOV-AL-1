### Créer un dossier 14_state dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Vous développez une machine à boisson automatique.  
Cette machine passe par plusieurs états :  
- En attente d’une pièce  
- Pièce insérée  
- Boisson en cours de distribution  
- En rupture de stock  

Problème : le comportement de la machine dépend de son **état interne**,  
et votre code devient un ensemble de conditions `if` / `switch` difficiles à maintenir et à étendre.  
Chaque ajout d’un nouvel état oblige à modifier plusieurs méthodes.

### Solution proposée :
Vous allez utiliser le **pattern State** pour **encapsuler les comportements liés à chaque état** dans des classes séparées.  
Ainsi, la machine délègue son comportement à l’objet représentant son état courant,  
et peut changer d’état dynamiquement sans modifier son code principal.

L’idée est de :

1. **Définir une interface `State`** décrivant les actions possibles de la machine  
   (ex. `insererPiece()`, `selectionnerBoisson()`, `distribuerBoisson()`).

2. **Créer plusieurs classes concrètes d’état** :
   - `EtatEnAttente` : attend qu’une pièce soit insérée  
   - `EtatPieceInseree` : une pièce est insérée, la machine attend une sélection  
   - `EtatDistribution` : la boisson est en cours de distribution  
   - `EtatRupture` : plus de boisson disponible  

3. **Créer une classe `MachineBoisson`** qui possède une référence vers son état courant (`State currentState`).  
   - Chaque méthode de la machine délègue l’action à l’état actuel.  
   - L’état peut être changé dynamiquement (ex. `setState(new EtatRupture(this))`).

4. **Tester la mise en œuvre via une classe `Main`** :  
   - Simuler plusieurs scénarios : insertion d’une pièce, sélection de boisson, rupture, etc.  
   - Montrer comment le comportement change automatiquement selon l’état.

---

### Structure recommandée :

11_state/
 ├─ State.java  
 ├─ EtatEnAttente.java  
 ├─ EtatPieceInseree.java  
 ├─ EtatDistribution.java  
 ├─ EtatRupture.java  
 ├─ MachineBoisson.java  
 └─ Main.java
