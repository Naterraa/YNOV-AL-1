public class Main {
    public static void main(String[] args) {

        // Génération d’un rapport PDF
        ReportBuilder pdfBuilder = new PdfReportBuilder();
        ReportDirector pdfDirector = new ReportDirector(pdfBuilder);
        pdfDirector.constructFullReport();
        Report pdfReport = pdfDirector.getReport();
        System.out.println("\n=== Rapport PDF ===");
        System.out.println(pdfReport.getContent());

        // Génération d’un rapport HTML
        ReportBuilder htmlBuilder = new HtmlReportBuilder();
        ReportDirector htmlDirector = new ReportDirector(htmlBuilder);
        htmlDirector.constructFullReport();
        Report htmlReport = htmlDirector.getReport();
        System.out.println("`\n=== Rapport HTML ===");
        System.out.println(htmlReport.getContent());
    }
}
