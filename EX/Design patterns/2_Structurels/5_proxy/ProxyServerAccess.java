public class ProxyServerAccess implements ServerAccess {
    private RealServerAccess realServer;
    private String userRole;

    public ProxyServerAccess(String userRole) {
        this.userRole = userRole;
        this.realServer = new RealServerAccess();
    }

    @Override
    public void connect() {
        realServer.connect();
    }

    @Override
    public void reboot() {
        if (userRole.equalsIgnoreCase("ADMIN")) {
            realServer.reboot();
        } else {
            System.out.println("Accès refusé : seul un administrateur peut redémarrer le serveur.");
        }
    }

    @Override
    public void deleteUser(String username) {
        if (userRole.equalsIgnoreCase("ADMIN")) {
            realServer.deleteUser(username);
        } else {
            System.out.println("Accès refusé : seul un administrateur peut supprimer un utilisateur.");
        }
    }
}