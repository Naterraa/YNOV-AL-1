### Créer un dossier 11_observer dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Vous développez une application de météo.  
Cette application reçoit régulièrement des données (température, humidité, pression) provenant d’une station météorologique.  

Problème : plusieurs modules de votre application (affichage, statistiques, alertes, etc.) doivent être informés automatiquement lorsque les données changent.  
Actuellement, chaque module doit interroger manuellement la station pour obtenir les dernières valeurs, ce qui crée du code difficile à maintenir.

### Solution proposée :
Vous allez utiliser le **pattern Observer** pour permettre à plusieurs objets (les observateurs) d’être automatiquement notifiés lorsqu’un objet principal (le sujet) change d’état.  

L’idée est de :

1. Définir deux interfaces principales :
   - **Subject** : représente la station météo (source de données).
   - **Observer** : représente les différents modules qui veulent être notifiés.

2. Le sujet maintient une liste d’observateurs enregistrés.  
   Lorsqu’une nouvelle donnée météo arrive, le sujet **notifie automatiquement** tous les observateurs.

3. Chaque observateur met à jour son affichage ou son comportement en fonction des nouvelles valeurs reçues.

4. Tester la mise en œuvre via une classe `Main` :  
   - Créez une instance de la station météo.  
   - Ajoutez plusieurs observateurs (par exemple : un affichage des conditions actuelles et un affichage des statistiques).  
   - Modifiez les données météo pour vérifier que tous les observateurs sont bien notifiés automatiquement.

---

### Structure recommandée : 

8_observer/
 ├─ Observer.java  
 ├─ Subject.java  
 ├─ WeatherStation.java  
 ├─ CurrentConditionsDisplay.java  
 ├─ StatisticsDisplay.java  
 └─ Main.java