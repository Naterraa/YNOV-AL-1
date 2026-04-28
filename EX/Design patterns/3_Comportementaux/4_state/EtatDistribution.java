public class EtatDistribution implements State {
    private MachineBoisson machine;

    public EtatDistribution(MachineBoisson machine) {
        this.machine = machine;
    }

    @Override
    public void insererPiece() {
        System.out.println("Distribution en cours, veuillez patienter.");
    }

    @Override
    public void selectionnerBoisson() {
        System.out.println("Déjà en cours de distribution.");
    }

    @Override
    public void distribuer() {
        // Test stock 
        // si oui ici 
        machine.libererBoisson();
    }
}