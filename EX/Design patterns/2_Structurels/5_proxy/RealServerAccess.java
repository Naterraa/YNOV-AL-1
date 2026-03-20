public class RealServerAccess implements ServerAccess {
    @Override
    public void connect() {
        System.out.println("Connexion au serveur établie.");
    }

    @Override
    public void reboot() {
        System.out.println("Le serveur redémarre...");
    }

    @Override
    public void deleteUser(String username) {
        System.out.println("Utilisateur " + username + " supprimé du serveur.");
    }
}