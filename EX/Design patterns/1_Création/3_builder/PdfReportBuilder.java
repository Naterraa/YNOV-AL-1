public class PdfReportBuilder implements ReportBuilder {
    private Report report = new Report();

    @Override
    public void addTitle(String title) {
        report.add("[PDF] Titre : " + title);
    }

    @Override
    public void addTable(String data) {
        report.add("[PDF] Tableau : " + data);
    }

    @Override
    public void addChart(String chart) {
        report.add("[PDF] Graphique : " + chart);
    }

    @Override
    public void addConclusion(String conclusion) {
        report.add("[PDF] Conclusion : " + conclusion);
    }

    @Override
    public Report getReport() {
        return report;
    }
}
