public class Cafe extends BoissonChaud {
    @Override
    protected void preparer() {
        System.out.println("Préparer le café moulu.");
    }

    @Override
    protected void ajouterIngredients() {
        System.out.println("Ajouter du sucre et du lait.");
    }
}