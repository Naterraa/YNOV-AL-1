import java.util.ArrayList;
import java.util.List;

public class Directory implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> children = new ArrayList<>();

    public Directory(String name) {
        this.name = name;
    }

    public void add(FileSystemComponent component) {
        children.add(component);
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + "+ Dossier : " + name);
        for (FileSystemComponent child : children) {
            child.display(indent + "   ");
        }
    }
}
