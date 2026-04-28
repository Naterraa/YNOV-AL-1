public abstract class BoissonChaud {

    public final void preparerRecette() {

        // Etape 1
        faireBouillirEau();

        // Etape 2
        preparer();

        // Etape 3
        verserDansTasse();

        // Option Etape 4
        if (souhaiteAjouterIngredients()) {
            ajouterIngredients();
        }
    }
    
    private void faireBouillirEau() {
        System.out.println("Faire bouillir l’eau...");
    }

    private void verserDansTasse() {
        System.out.println("Verser dans la tasse.");
    }

    // Propre à la classe enfant
    protected abstract void preparer();
    protected abstract void ajouterIngredients();

    protected boolean souhaiteAjouterIngredients() {
        return true;
    }
}