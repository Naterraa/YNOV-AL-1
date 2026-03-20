public class MediaFacade {
    private AudioPlayer audioPlayer;
    private VideoPlayer videoPlayer;

    public MediaFacade() {
        this.audioPlayer = new AudioPlayer();
        this.videoPlayer = new VideoPlayer();
    }

    public void playMovie(String file) {
        System.out.println("Préparation du lecteur multimédia...");
        videoPlayer.loadVideo(file);
        audioPlayer.loadAudio(file);

        videoPlayer.playVideo();
        audioPlayer.playAudio();
        System.out.println("Lecture terminée.");
    }
}