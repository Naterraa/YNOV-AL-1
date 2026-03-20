public class Main {
    public static void main(String[] args) {
        // crée bien avant
        WeatherStation station = new WeatherStation();

        // crée bien avant
        Observer current = new CurrentConditionsDisplay();
        Observer stats = new StatisticsDisplay();

        // on ajoute les observateurs (bien avant)
        station.addObserver(current);
        station.addObserver(stats);

        // quelque part dans le code
        // on vient modifier les mesures de la station via une API
        // setMeasurements appelera la methode notify

        station.setMeasurements(25.4f, 60);
        station.setMeasurements(27.8f, 55);
    }
}