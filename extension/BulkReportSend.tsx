import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { generatePDFReport } from './reportGenerator';

const BulkSendReports: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleBulkSend = async () => {
    setStatus('Fetching data and generating reports...');

    try {
      const customersResponse = await axios.get('/customers');
      const customers = customersResponse.data;

      const sendReportPromises = customers.map(async (customer: any) => {
        const response = await axios.post('/generate-report', {
          customerId: customer.id,
          initialStart: '2023-01-01',
          initialEnd: '2023-03-31',
          endingStart: '2023-04-01',
          endingEnd: '2023-06-30',
        });

        const reportData = response.data;
        const pdfBlob = await generatePDFReport(reportData);

        const pdfBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(pdfBlob);
        });

        const pdfData = pdfBase64.split(',')[1];

        await axios.post('/send-email', {
          email: customer.email,
          pdf: pdfData,
        });
      });

      await Promise.all(sendReportPromises);

      setStatus('Reports sent successfully');
    } catch (err) {
      setStatus('Failed to send reports');
    }
  };

  return (
    <div>
      <h1>Bulk Send Sales Variance Reports</h1>
      <button onClick={handleBulkSend}>Send Reports</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default BulkSendReports;

