### Créer un dossier 2_factory_method dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Une application de dessin permet de créer différentes formes (Cercle, Rectangle, Triangle).
Actuellement, le code client utilise directement `new Cercle()`, `new Rectangle()`, etc.
Résultat : si l’on ajoute une nouvelle forme, il faut modifier tout le code client, ce qui le rend rigide et difficile à maintenir.

### Solution proposée :
Vous allez utiliser le pattern Factory Method pour déléguer la création des objets aux sous-classes.
L’idée est de :

1. Définir une classe abstraite `ShapeFactory` avec une méthode `createShape()`.
2. Implémenter plusieurs fabriques concrètes (`CircleFactory`, `RectangleFactory`…) qui créent chaque forme.
3. Tester la mise en œuvre via une classe `Main` : instancier des fabriques différentes et créer des formes sans jamais appeler `new` (sauf FACTORY) directement dans le code client.

On ne dessinera pas de cercle, ou de triangle, la méthode draw() affiche juste, par exemple, "Dessin d'un cercle"

### Structure recommandée : 

2_factory_method/
 ├─ Shape.java
 ├─ Circle.java
 ├─ Rectangle.java
 ├─ Triangle.java
 ├─ ShapeFactory.java
 ├─ CircleFactory.java
 ├─ RectangleFactory.java
 ├─ TriangleFactory.java
 └─ Main.java