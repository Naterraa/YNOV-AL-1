### Créer un dossier 9_facade dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Un logiciel de multimédia doit gérer des opérations complexes (charger un fichier, décoder, synchroniser l’audio et la vidéo).  
Problème : le client doit appeler de nombreuses classes internes, ce qui rend le code difficile à lire et fortement couplé à l’implémentation.

### Solution proposée :
Vous allez utiliser le pattern Façade pour fournir une interface simplifiée vers un sous-système complexe.  
L’idée est de :

1. Créer une classe `MediaFacade` qui encapsule les appels aux différentes classes du sous-système (décodage, son, image).  
2. Le client utilise uniquement cette façade pour lire un média.  
3. Tester la mise en œuvre via une classe `Main` : lancer la lecture d’un fichier média en n’appelant que la façade. (peu de code)

### Structure attendue : 

9_facade/
 ├─ AudioPlayer.java
 ├─ VideoPlayer.java
 ├─ MediaFacade.java
 └─ Main.java
