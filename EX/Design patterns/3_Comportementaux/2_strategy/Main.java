public class Main {
    public static void main(String[] args) {
        Personnage soldat = new Personnage(new MarcheStrategy());
        soldat.seDeplacer();

        soldat.setStrategie(new ConduiteStrategy());
        soldat.seDeplacer();

        soldat.setStrategie(new VolStrategy());
        soldat.seDeplacer();
    }
}