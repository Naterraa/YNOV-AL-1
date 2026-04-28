public class EtatRupture implements State {
    private MachineBoisson machine;

    public EtatRupture(MachineBoisson machine) {
        this.machine = machine;
    }

    @Override
    public void insererPiece() {
        System.out.println("Machine en rupture, remboursement...");
    }

    @Override
    public void selectionnerBoisson() {
        System.out.println("Machine en rupture, aucune boisson disponible.");
    }

    @Override
    public void distribuer() {
        System.out.println("Impossible, machine vide.");
    }
}