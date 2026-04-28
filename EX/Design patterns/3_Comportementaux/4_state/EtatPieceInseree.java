public class EtatPieceInseree implements State {
    private MachineBoisson machine;

    public EtatPieceInseree(MachineBoisson machine) {
        this.machine = machine;
    }

    @Override
    public void insererPiece() {
        System.out.println("Une pièce est déjà insérée !");
    }

    @Override
    public void selectionnerBoisson() {
        System.out.println("Boisson sélectionnée.");
        machine.setState(machine.getEtatDistribution());
        machine.distribuer();
    }

    @Override
    public void distribuer() {
        System.out.println("Veuillez d'abord choisir une boisson.");
    }
}