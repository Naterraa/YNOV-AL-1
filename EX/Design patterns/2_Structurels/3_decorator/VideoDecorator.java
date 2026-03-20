// Classe abstraite qui servira de base à tous les décorateurs
public abstract class VideoDecorator implements VideoStream {
    protected VideoStream decoratedStream;

    public VideoDecorator(VideoStream decoratedStream) {
        this.decoratedStream = decoratedStream;
    }

    @Override
    public void play() {
        decoratedStream.play();
    }
}
