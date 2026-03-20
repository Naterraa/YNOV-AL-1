public class RemoteControl {
    private Command command;

    // Prend n'importe quelle commande
    public void setCommand(Command command) {
        this.command = command;
    }

    // Lance la méthode execute de ma commande
    public void pressButton() {
        command.execute();
    }
}