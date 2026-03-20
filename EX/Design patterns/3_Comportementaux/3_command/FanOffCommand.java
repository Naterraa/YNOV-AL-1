public class FanOffCommand implements Command {

    // Le receiver concerné
    private Fan fan;

    // initialisation
    public FanOffCommand(Fan fan) {
        this.fan = fan;
    }

    // méthode stop de mon receiver lancée
    @Override
    public void execute() {
        fan.stop();
    }
}