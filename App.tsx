import React, { useState } from 'react';
import ReportForm from './ReportForm';
import { generatePDFReport, generateExcelReport } from './reportGenerator';

const App: React.FC = () => {
  const [reportData, setReportData] = useState<any>(null);

  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch('/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      const initialData = {
        weight: data.weightInitial,
        revenue: data.revenueInitial,
        pieces: data.piecesInitial,
        shipments: data.shipmentsInitial,
      };
      const endingData = {
        weight: data.weightEnding,
        revenue: data.revenueEnding,
        pieces: data.piecesEnding,
        shipments: data.shipmentsEnding,
      };

      const pdfBuffer = await generatePDFReport(initialData, endingData);
      const excelBuffer = await generateExcelReport(initialData, endingData);

      setReportData({ pdf: pdfBuffer.toString('base64'), excel: excelBuffer.toString('base64') });
    } catch (error) {
      console.error('Error generating report', error);
    }
  };

  return (
    <div>
      <h1>Sales Variance Report Generator</h1>
      <ReportForm onSubmit={handleSubmit} />
      {reportData && (
        <div>
          <h2>Report</h2>
          <a href={`data:application/pdf;base64,${reportData.pdf}`} download="report.pdf">Download PDF</a>
          <a href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${reportData.excel}`} download="report.xlsx">Download Excel</a>
        </div>
      )}
    </div>
  );
};

export default App;

