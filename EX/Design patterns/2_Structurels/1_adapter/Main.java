public class Main {
    public static void main(String[] args) {

        // Ancienne lib
        LegacyLibrary oldLib = new LegacyLibrary();

        // Adapteur vers l'interface nouvelle
        IDataReader adapter = new DataAdapter(oldLib);

        System.out.println(adapter.readData());
    }
}