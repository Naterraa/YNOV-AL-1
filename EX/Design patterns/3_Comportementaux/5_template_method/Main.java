public class Main {
    public static void main(String[] args) {
        System.out.println("=== Préparation du thé ===");
        BoissonChaud the = new The();
        the.preparerRecette();

        System.out.println("\n=== Préparation du café ===");
        BoissonChaud cafe = new Cafe();
        cafe.preparerRecette();
    }
}