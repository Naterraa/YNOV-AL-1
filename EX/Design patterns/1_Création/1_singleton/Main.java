public class Main {
    public static void main(String[] args) {

        // Création de l'instance
        DatabaseConnection db1 = DatabaseConnection.getInstance();
        // Renvoie la même instance
        DatabaseConnection db2 = DatabaseConnection.getInstance();

        // Vérification des références  avec hashCode (représentation numérique de mon objet)
        System.out.println("db1 hashCode : " + db1.hashCode());
        System.out.println("db2 hashCode : " + db2.hashCode());

        if (db1 == db2) {
            System.out.println("Les deux objets pointent vers la même instance !");
        } else {
            System.out.println("Objets différents");
        }

        // Afficher l'état de la "connexion"
        System.out.println("Message : " + db1.getConnection());
    }
}
