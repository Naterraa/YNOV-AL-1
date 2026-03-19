### Créer un dossier 4_builder dans lequel vous réaliserez votre exercice.

### Problématique rencontrée :
Un logiciel doit générer des rapports complexes composés de plusieurs parties (titre, tableau, graphique, conclusion).
Résultat : les constructeurs deviennent énormes et difficiles à maintenir si on veut permettre plusieurs variantes (rapport PDF, rapport HTML, rapport simplifié…).

### Solution proposée :
Vous allez utiliser le pattern Builder pour séparer la logique de construction de la représentation finale.
L’idée est de :

1. Créer une classe `ReportBuilder` avec les étapes de construction (ajouter titre, ajouter tableau, ajouter graphique, puis conclusion).
2. Implémenter différents builders concrets (`PdfReportBuilder`, `HtmlReportBuilder`), chacun produisant une variante de rapport (on différenciera les deux rapports : pour le html pour chaque ligne on a des balises, pour le pdf toutes les lignes commencent par [PDF])
3. Tester la mise en œuvre via une classe `Main` : créer un rapport PDF et un rapport HTML en utilisant le même processus de construction.

### Structure recommandée : 

4_builder/
 ├─ ReportBuilder.java
 ├─ PdfReportBuilder.java
 ├─ HtmlReportBuilder.java
 ├─ ReportDirector.java
 ├─ Report.java
 └─ Main.java
