public abstract class ShapeFactory {
    // Méthode Factory (abstraite, implémentée par les sous-classes)
    // Aurait pu être une interface
    // L'intérêt ici de faire une classe est de pouvoir ajouter du code commun partagé avec toutes les factories
    public abstract Shape createShape();
}