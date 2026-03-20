public class Main {
    public static void main(String[] args) {
        // Création de fichiers
        File file1 = new File("document.txt");
        File file2 = new File("photo.jpg");
        File file3 = new File("notes.pdf");

        // Création de dossiers
        Directory root = new Directory("Racine");
        Directory images = new Directory("Images");
        Directory docs = new Directory("Documents");

        // Construction de l'arborescence
        root.add(file1);
        root.add(images);
        root.add(docs);

        images.add(file2);
        docs.add(file3);

        // Affichage de l'arborescence
        root.display("");
    }
}
