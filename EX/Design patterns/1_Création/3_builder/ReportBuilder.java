public interface ReportBuilder {
    void addTitle(String title);
    void addTable(String data);
    void addChart(String chart);
    void addConclusion(String conclusion);
    Report getReport();
}
