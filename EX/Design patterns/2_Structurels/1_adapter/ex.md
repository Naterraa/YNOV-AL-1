### Créer un dossier 6_adapter dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Vous développez une application qui doit afficher des données provenant d’une ancienne librairie externe.  
Problème : l’ancienne librairie expose des méthodes incompatibles avec l’interface attendue par votre application.  
Résultat : le code client ne peut pas utiliser directement ces classes, ce qui oblige à réécrire ou dupliquer du code.

### Solution proposée :
Vous allez utiliser le pattern Adapter pour rendre compatibles deux interfaces incompatibles.  
L’idée est de :

1. Définir une interface attendue par le client (ex. `IDataReader`).  
2. Créer un adaptateur qui implémente cette interface et traduit les appels vers la librairie externe.  
3. Tester la mise en œuvre via une classe `Main` : appeler vos méthodes via l’interface attendue, sans dépendre de la librairie externe directement.  


### Structure recommandée : 

6_adapter/
 ├─ IDataReader.java
 ├─ LegacyLibrary.java
 ├─ DataAdapter.java
 └─ Main.java