### Créer un dossier 15_template_method dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Vous développez une application qui prépare différentes boissons chaudes (ex. café, thé, chocolat).  
Chaque recette suit le **même enchaînement général d’étapes** :  
- Faire bouillir l’eau  
- Préparer la boisson spécifique  
- Verser dans la tasse  
- Ajouter des ingrédients optionnels (sucre, lait, citron, etc.)

Problème : chaque classe de boisson recopie le même squelette de code,  
avec seulement quelques étapes différentes.  
Cela provoque de la duplication et rend le code difficile à maintenir.

### Solution proposée :
Vous allez utiliser le **pattern Template Method** pour définir un **algorithme général commun**  
dans une classe abstraite, tout en laissant les **sous-classes** redéfinir certaines étapes spécifiques.  

L’idée est de :

1. **Créer une classe abstraite `BoissonChaud`** qui définit :
   - Une méthode finale `preparerRecette()` (le “template method”) décrivant les étapes communes.
   - Des méthodes abstraites comme `preparer()` ou `ajouterIngredients()` à implémenter dans les sous-classes.
   - Une méthode “hook” optionnelle (ex. `souhaiteAjouterIngredients()`) permettant de personnaliser le comportement.

2. **Créer des classes concrètes** qui héritent de `BoissonChaud` :
   - `The` : infuse le thé et ajoute du citron.  
   - `Cafe` : prépare du café et ajoute du sucre et du lait.

3. **Tester la mise en œuvre via une classe `Main`** :
   - Instancier les deux boissons.  
   - Appeler `preparerRecette()` pour observer la séquence complète d’exécution.  
   - Montrer que la structure du processus est commune, mais que certaines étapes varient selon la sous-classe.

---

### Structure recommandée :

12_template_method/
 ├─ BoissonChaud.java  
 ├─ The.java  
 ├─ Cafe.java  
 └─ Main.java
