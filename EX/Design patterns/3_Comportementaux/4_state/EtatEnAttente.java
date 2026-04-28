public class EtatEnAttente implements State {
    private MachineBoisson machine;

    public EtatEnAttente(MachineBoisson machine) {
        this.machine = machine;
    }

    @Override
    public void insererPiece() {
        System.out.println("Pièce insérée.");
        machine.setState(machine.getEtatPieceInseree());
    }

    @Override
    public void selectionnerBoisson() {
        System.out.println("Insérez d'abord une pièce.");
    }

    @Override
    public void distribuer() {
        System.out.println("Aucune pièce insérée.");
    }
}