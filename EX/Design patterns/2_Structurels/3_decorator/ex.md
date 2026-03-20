### Créer un dossier 7_decorator dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Une application de streaming propose des vidéos de base.  
On souhaite ajouter des fonctionnalités optionnelles comme les sous-titres, le téléchargement ou la qualité HD.  
Problème : créer une sous-classe pour chaque combinaison (Vidéo+HD, Vidéo+Sous-titres+Téléchargement, etc.) deviendrait vite ingérable.

### Solution proposée :
Vous allez utiliser le pattern Decorator pour ajouter dynamiquement des responsabilités à un objet.  
L’idée est de :

1. Définir une interface commune `VideoStream` avec une méthode `play()`.  
2. Créer une implémentation de base (ex. `BasicVideoStream`) et des décorateurs (`HDDecorator`, `SubtitleDecorator`, `DownloadDecorator`).  
3. Tester la mise en œuvre via une classe `Main` : combiner plusieurs décorateurs pour enrichir une vidéo sans créer de nouvelles sous-classes.  

### Structure proposée :

7_decorator/
 ├─ VideoStream.java // Interface commune vidéo
 ├─ BasicVideoStream.java // Vidéo simple de base
 ├─ VideoDecorator.java // Décorateur (abstrait) générique
 ├─ HDDecorator.java // Ajoute option 1
 ├─ SubtitleDecorator.java // Ajoute option 2
 ├─ DownloadDecorator.java // Ajoute option 3
 └─ Main.java