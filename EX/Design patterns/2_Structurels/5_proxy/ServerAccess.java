public interface ServerAccess {
    void connect();
    void reboot();
    void deleteUser(String username);
}