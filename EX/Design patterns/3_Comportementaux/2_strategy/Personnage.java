public class Personnage {
    private DeplacementStrategy strategie;

    public Personnage(DeplacementStrategy strategie) {
        this.strategie = strategie;
    }

    public void seDeplacer() {
        strategie.deplacer();
    }

    public void setStrategie(DeplacementStrategy strategie) {
        this.strategie = strategie;
    }
}