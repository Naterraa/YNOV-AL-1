public class DownloadDecorator extends VideoDecorator {
    public DownloadDecorator(VideoStream decoratedStream) {
        super(decoratedStream);
    }

    @Override
    public void play() {
        super.play();
        System.out.println("Option de téléchargement activée pour la vidéo.");
    }
}
