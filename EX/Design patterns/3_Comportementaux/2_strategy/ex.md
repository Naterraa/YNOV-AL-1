### Créer un dossier 12_strategy dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Vous développez un jeu dans lequel des personnages peuvent se déplacer différemment selon leur type :  
un soldat marche, un pilote conduit, un super-héros vole.  

Problème : si vous codez la logique de déplacement directement dans la classe `Personnage`,  
vous devrez sans cesse modifier cette classe pour ajouter ou changer un type de déplacement.  
Cela rend le code rigide, difficile à maintenir et à étendre.

### Solution proposée :
Vous allez utiliser le **pattern Strategy** pour rendre le comportement de déplacement **interchangeable dynamiquement**.  
Chaque type de déplacement sera implémenté dans une **stratégie distincte**, que vous pourrez changer à tout moment.

L’idée est de :

1. **Définir une interface `DeplacementStrategy`** qui décrit le comportement général de déplacement (ex. méthode `deplacer()`).

2. **Créer plusieurs implémentations concrètes** de cette interface :  
   - `MarcheStrategy` : déplacement à pied  
   - `ConduiteStrategy` : déplacement en véhicule  
   - `VolStrategy` : déplacement en volant  

3. **Créer une classe `Personnage`** qui possède une référence vers une stratégie de déplacement.  
   - La stratégie peut être changée à tout moment via un setter.  
   - La méthode `seDeplacer()` délègue le comportement à la stratégie actuelle.

4. **Créer une classe `Main`** pour tester le fonctionnement :  
   - Créer plusieurs personnages avec des stratégies différentes.  
   - Modifier leur stratégie à l’exécution pour montrer la flexibilité du pattern.

---

### Structure recommandée :

9_strategy/
 ├─ DeplacementStrategy.java  
 ├─ MarcheStrategy.java  
 ├─ ConduiteStrategy.java  
 ├─ VolStrategy.java  
 ├─ Personnage.java  
 └─ Main.java
