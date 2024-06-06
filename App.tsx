import React, { useState } from 'react';
import ReportForm from './ReportForm';
import { generatePDFReport } from './reportGenerator';

const App: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null);

  const handleSubmit = async (formData: any) => {
    const response = await fetch('/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    const initialOrders = data.initialOrders;
    const endingOrders = data.endingOrders;

    let weightInitial = 0;
    let revenueInitial = 0;
    let piecesInitial = 0;
    let shipmentsInitial = initialOrders.length;

    for (const order of initialOrders) {
      weightInitial += order.weight;
      revenueInitial += order.revenue;
      piecesInitial += order.pieces;
    }

    let weightEnding = 0;
    let revenueEnding = 0;
    let piecesEnding = 0;
    let shipmentsEnding = endingOrders.length;

    for (const order of endingOrders) {
      weightEnding += order.weight;
      revenueEnding += order.revenue;
      piecesEnding += order.pieces;
    }

    const reportData = {
      weightInitial,
      revenueInitial,
      piecesInitial,
      shipmentsInitial,
      weightEnding,
      revenueEnding,
      piecesEnding,
      shipmentsEnding,
    };

    const pdfBlob = await generatePDFReport(reportData);
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setReportData({ pdfUrl });
  };

  return (
    <div>
      <h1>Sales Variance Report Generator</h1>
      <ReportForm onSubmit={handleSubmit} />
      {reportData && (
        <div>
          <h2>Report</h2>
          <a href={reportData.pdfUrl} download="report.pdf">Download PDF</a>
        </div>
      )}
    </div>
  );
};

export default App;

