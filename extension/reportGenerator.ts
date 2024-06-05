import PDFDocument from 'pdfkit';
import { ReportData } from './types';

export const generatePDFReport = async (data: ReportData): Promise<Blob> => {
  const doc = new PDFDocument();
  let buffers: Buffer[] = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    return new Blob([pdfData], { type: 'application/pdf' });
  });

  doc.text(`Sales Variance Report`);
  doc.text(`Initial Period:`);
  doc.text(`Weight: ${data.weightInitial}`);
  doc.text(`Revenue: ${data.revenueInitial}`);
  doc.text(`Pieces: ${data.piecesInitial}`);
  doc.text(`Shipments: ${data.shipmentsInitial}`);
  doc.text(`Ending Period:`);
  doc.text(`Weight: ${data.weightEnding}`);
  doc.text(`Revenue: ${data.revenueEnding}`);
  doc.text(`Pieces: ${data.piecesEnding}`);
  doc.text(`Shipments: ${data.shipmentsEnding}`);
  doc.end();
};

