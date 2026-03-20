### Créer un dossier 8_composite dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Vous devez gérer une structure hiérarchique de fichiers et dossiers.  
Problème : le code client doit gérer différemment les fichiers simples et les dossiers qui contiennent d’autres éléments.  
Résultat : beaucoup de conditions dans le code et une forte complexité.

### Solution proposée :
Vous allez utiliser le pattern Composite pour traiter de manière uniforme les objets simples et les groupes d’objets.  
L’idée est de :

1. Définir une interface commune `FileSystemComponent` avec des méthodes comme `display()`.  
2. Implémenter des classes simples (`File`) et composites (`Directory`) qui respectent la même interface.  
3. Tester la mise en œuvre via une classe `Main` : créer une arborescence de dossiers/fichiers et appeler `display()` sans distinction entre fichier et dossier.  

### Structure attendue : 

8_composite/
 ├─ FileSystemComponent.java
 ├─ File.java
 ├─ Directory.java
 └─ Main.java