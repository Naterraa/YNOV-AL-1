public class HDDecorator extends VideoDecorator {
    public HDDecorator(VideoStream decoratedStream) {
        super(decoratedStream);
    }

    @Override
    public void play() {
        super.play();
        System.out.println("Ajout de la qualité HD à la vidéo.");
    }
}
