public class CurrentConditionsDisplay implements Observer {
    @Override
    public void update(float temperature, float humidity) {
        System.out.println("Conditions actuelles : " + temperature + "°C et " + humidity + "% d'humidité");
    }
}