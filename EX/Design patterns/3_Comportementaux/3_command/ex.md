### Créer un dossier 13_command dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Vous développez une application de domotique qui permet de contrôler différents appareils :  
lumières, ventilateurs, volets, etc.

Problème : le code qui déclenche les actions (ex. boutons, télécommande, interface graphique)  
doit connaître directement les classes concrètes de chaque appareil et leurs méthodes spécifiques.  
Résultat : le code devient difficile à maintenir et à étendre si vous ajoutez de nouveaux appareils ou de nouvelles actions.

### Solution proposée :
Vous allez utiliser le **pattern Command** pour **encapsuler les actions sous forme d’objets**.  
Chaque commande représente une action (ex. "allumer la lumière") et peut être exécutée, annulée ou stockée.

L’idée est de :

1. **Définir une interface `Command`** avec une méthode `execute()` (et éventuellement `undo()`).

2. **Créer des commandes concrètes** qui implémentent cette interface :  
   - `LightOnCommand` : allume la lumière  
   - `LightOffCommand` : éteint la lumière  
   - `FanOnCommand`, `FanOffCommand`, etc.

3. **Créer des classes "receveurs"** (ex. `Light`, `Fan`) contenant les vraies méthodes métier (`turnOn()`, `turnOff()`).

4. **Créer un "invocateur"** (ex. `RemoteControl`) qui ne connaît pas les détails des appareils,  
   mais qui reçoit une commande et l’exécute.

5. **Tester la mise en œuvre via une classe `Main`** :  
   - Créez les appareils et les commandes correspondantes.  
   - Associez-les à une télécommande.  
   - Exécutez plusieurs actions pour montrer la flexibilité du pattern.

---

### Structure recommandée :

10_command/
 ├─ Command.java  
 ├─ Light.java  
 ├─ Fan.java  
 ├─ LightOnCommand.java  
 ├─ LightOffCommand.java  
 ├─ FanOnCommand.java  
 ├─ FanOffCommand.java  
 ├─ RemoteControl.java  
 └─ Main.java
