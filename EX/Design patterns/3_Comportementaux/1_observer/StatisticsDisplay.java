import java.util.ArrayList;
import java.util.List;

public class StatisticsDisplay implements Observer {
    private List<Float> history = new ArrayList<>();

    @Override
    public void update(float temperature, float humidity) {
        history.add(temperature);
        double avg = history.stream().mapToDouble(Float::doubleValue).average().orElse(0);
        System.out.println("Température moyenne : " + avg + "°C");
    }
}