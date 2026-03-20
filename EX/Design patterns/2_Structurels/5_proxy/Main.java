public class Main {
    public static void main(String[] args) {
        System.out.println("=== Connexion d'un utilisateur standard ===");
        ServerAccess userAccess = new ProxyServerAccess("USER");
        userAccess.connect();
        userAccess.deleteUser("alice");
        userAccess.reboot();

        System.out.println("\n=== Connexion d'un administrateur ===");
        ServerAccess adminAccess = new ProxyServerAccess("ADMIN");
        adminAccess.connect();
        adminAccess.deleteUser("bob");
        adminAccess.reboot();
    }
}