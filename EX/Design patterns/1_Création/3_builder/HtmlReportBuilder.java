public class HtmlReportBuilder implements ReportBuilder {
    private Report report = new Report();

    @Override
    public void addTitle(String title) {
        report.add("<h1>" + title + "</h1>");
    }

    @Override
    public void addTable(String data) {
        report.add("<table><tr><td>" + data + "</td></tr></table>");
    }

    @Override
    public void addChart(String chart) {
        report.add("<div class='chart'>" + chart + "</div>");
    }

    @Override
    public void addConclusion(String conclusion) {
        report.add("<p><b>Conclusion :</b> " + conclusion + "</p>");
    }

    @Override
    public Report getReport() {
        return report;
    }
}
