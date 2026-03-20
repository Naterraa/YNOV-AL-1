public class SubtitleDecorator extends VideoDecorator {
    public SubtitleDecorator(VideoStream decoratedStream) {
        super(decoratedStream);
    }

    @Override
    public void play() {
        super.play();
        System.out.println("Ajout des sous-titres à la vidéo.");
    }
}
