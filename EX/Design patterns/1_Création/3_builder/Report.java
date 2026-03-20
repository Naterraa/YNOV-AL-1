public class Report {
    private String content = "";

    public void add(String part) {
        content += part + "\n";
    }

    public String getContent() {
        return content;
    }
}
