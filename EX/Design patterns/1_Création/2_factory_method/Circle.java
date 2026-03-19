public class Circle implements Shape {

    @Override // Convention, pour être certain que draw redéfinis la méthode de l'interface implémentée
    public void draw() {
        System.out.println("Dessin d'un cercle");
    }
}
