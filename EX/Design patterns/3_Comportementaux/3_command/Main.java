public class Main {
    public static void main(String[] args) {

        System.out.println("\n");
        // Les receiver
        Light light = new Light();
        Fan fan = new Fan();

        // Les commandes associées utilisables
        Command lightOn = new LightOnCommand(light);
        Command lightOff = new LightOffCommand(light);
        Command fanOn = new FanOnCommand(fan);
        Command fanOff = new FanOffCommand(fan);
        
        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton();

        remote.setCommand(fanOn);
        remote.pressButton();

        remote.setCommand(lightOff);
        remote.pressButton();

        remote.setCommand(fanOff);
        remote.pressButton();

        System.out.println("\n");
    }
}
