public class MachineBoisson {
    private State etatEnAttente;
    private State etatPieceInseree;
    private State etatDistribution;
    private State etatRupture;

    private State etatActuel;
    private int stock = 2;

    public MachineBoisson() {
        etatEnAttente = new EtatEnAttente(this);
        etatPieceInseree = new EtatPieceInseree(this);
        etatDistribution = new EtatDistribution(this);
        etatRupture = new EtatRupture(this);

        etatActuel = stock > 0 ? etatEnAttente : etatRupture;
        // if(stock > 0) {
        //     etatActuel = etatEnAttente;
        // }
        // else {
        //     etatActuel = etatRupture;
        // }
    }

    public void setState(State state) {
        this.etatActuel = state;
    }

    public State getEtatEnAttente() { return etatEnAttente; }
    public State getEtatPieceInseree() { return etatPieceInseree; }
    public State getEtatDistribution() { return etatDistribution; }
    public State getEtatRupture() { return etatRupture; }

    public void insererPiece() { etatActuel.insererPiece(); }
    public void selectionnerBoisson() { etatActuel.selectionnerBoisson(); }
    public void distribuer() { etatActuel.distribuer(); }

    public void libererBoisson() {
        if (stock > 0) {
            stock--;
            System.out.println("Une boisson est servie !");
        }
        if (stock == 0) {
            setState(etatRupture);
        } else {
            setState(etatEnAttente);
        }
    }
}