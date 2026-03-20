public class Main {
    public static void main(String[] args) {
        // Vidéo simple
        VideoStream video = new BasicVideoStream();
        video.play();

        System.out.println("\n--- Vidéo HD ---");
        VideoStream hdVideo = new HDDecorator(new BasicVideoStream());
        hdVideo.play();

        System.out.println("\n--- Vidéo HD avec sous-titres ---");
        VideoStream hdSubVideo = new SubtitleDecorator(new HDDecorator(new BasicVideoStream()));
        hdSubVideo.play();

        System.out.println("\n--- Vidéo HD avec sous-titres et téléchargement ---");
        VideoStream fullVideo = new DownloadDecorator(
                                    new SubtitleDecorator(
                                        new HDDecorator(
                                            new BasicVideoStream())));
                                                fullVideo.play();
    }
}
