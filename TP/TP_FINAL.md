# Enoncé


La boutique en ligne TechGear souhaite transformer son système monolithique actuel en une architecture microservices hautement scalable. 
Le défi majeur est d'assurer la cohérence des données et la traçabilité des opérations dans un environnement découplé. 
Vous êtes en charge de concevoir et d'implémenter le prototype de ce nouveau système, baptisé OrderFlow.

Le système gère le cycle de vie d'une commande de matériel informatique :

- Commande : Identifiant unique (UUID), statut (PENDING, VALIDATED, PAID, SHIPPED, FAILED), liste d'articles, montant total.
- Article : SKU, nom, prix unitaire, quantité en stock.
- Paiement : Méthode (Carte, PayPal, Virement), date, statut de la transaction.
- Expédition : Numéro de suivi et date estimée.

# Modalités

- Travail par groupe de 1 ou 2 étudiants
- Rendu : un lien git par groupe avec README et support de présentation
- Évaluation : Oral de 5 minutes présentant la démarche, les choix techniques et une démonstration rapide (vous avez le droit à des notes si vous le voulez).

# Travail Demandé

1. Produisez un dossier de conception technique :

- Diagramme de cas d'utilisations.
- Diagramme de classes.
- Diagramme de séquence illustrant le flux asynchrone (de la réception de la requête jusqu'à l'expédition).

2. Implémentation Microservices

Développez les services (Commande, Stock, Paiement, Livraison) en utilisant plusieurs design patterns :

- Strategy : Pour les modes de paiement.
- Factory/Builder : Pour la création des objets métier.
- State Pattern : Pour gérer les changements d'état de la commande.

Communication asynchrone : Utilisation de Kafka pour la chorégraphie des événements (OrderCreated, StockReserved, etc.).

3. Observabilité (Logs centralisés)

Pour assurer le suivi des transactions, vous devez mettre en place une stack Elasticsearch :

- Collecte : Chaque microservice doit envoyer ses logs vers Elasticsearch.
- Traçabilité : Vous devez implémenter un Correlation ID unique par commande. Ce ID doit être transmis via les en-têtes Kafka et injecté dans chaque log de chaque service pour permettre de reconstruire le parcours d'une commande .

# Livrables

1. Dossier technique (PDF) : Diagrammes UML et explication de l'utilisation de chacun des design patterns.
2. Code source (Git) : Organisation propre, avec readme et explication clair de comment lancer le projet.
3. Présentation (Diapos - 5 min) avec architecture globale et démonstration avec logs