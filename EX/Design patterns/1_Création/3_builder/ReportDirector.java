public class ReportDirector {
    private ReportBuilder builder;

    public ReportDirector(ReportBuilder builder) {
        this.builder = builder;
    }

    public void constructFullReport() {
        builder.addTitle("Rapport Annuel 2025");
        builder.addTable("Données financières Q1-Q4");
        builder.addChart("Graphique de performance");
        builder.addConclusion("Bonne croissance, perspectives positives.");
    }

    public Report getReport() {
        return builder.getReport();
    }
}
