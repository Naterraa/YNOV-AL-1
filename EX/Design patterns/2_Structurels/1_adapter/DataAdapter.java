// Adaptateur qui rend compatible LegacyLibrary avec IDataReader
// Demain, si je change de library, je dois juste modifier l'adapter
public class DataAdapter implements IDataReader {
    private LegacyLibrary legacyLibrary;

    public DataAdapter(LegacyLibrary legacyLibrary) {
        this.legacyLibrary = legacyLibrary;
    }

    @Override
    public String readData() {
        // On adapte l’appel à la méthode attendue
        // On aurait pu ajouter ici tout type de fonctions qui aurait permis d'aider à transformer/nettoyer les données 
        // récupérées depuis legacyLibrary
        return legacyLibrary.getContent();
    }
}