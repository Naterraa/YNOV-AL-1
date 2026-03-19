public class TriangleFactory extends ShapeFactory {
    @Override
    public Shape createShape() {
        return new Triangle();
    }
}
