public class Main {
    public static void main(String[] args) {
        
        // Création via les factories
        ShapeFactory circleFactory = new CircleFactory();
        ShapeFactory rectangleFactory = new RectangleFactory();
        ShapeFactory triangleFactory = new TriangleFactory();

        // Le code client ne fait jamais "new Circle()" directement
        Shape circle = circleFactory.createShape();
        Shape rectangle = rectangleFactory.createShape();
        Shape triangle = triangleFactory.createShape();

        // Utilisation des objets créés
        circle.draw();
        rectangle.draw();
        triangle.draw();
    }
}
