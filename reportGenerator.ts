import { ReportData } from './types';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';

export const generatePDFReport = async (initialData: ReportData, endingData: ReportData): Promise<Buffer> => {
  const doc = new PDFDocument();
  let buffers: Buffer[] = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    return pdfData;
  });

  doc.text(`Sales Variance Report`);
  doc.text(`Initial Period:`);
  doc.text(`Weight: ${initialData.weight}`);
  doc.text(`Revenue: ${initialData.revenue}`);
  doc.text(`Pieces: ${initialData.pieces}`);
  doc.text(`Shipments: ${initialData.shipments}`);
  doc.text(`Ending Period:`);
  doc.text(`Weight: ${endingData.weight}`);
  doc.text(`Revenue: ${endingData.revenue}`);
  doc.text(`Pieces: ${endingData.pieces}`);
  doc.text(`Shipments: ${endingData.shipments}`);
  doc.end();
};

export const generateExcelReport = async (initialData: ReportData, endingData: ReportData): Promise<Buffer> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sales Variance Report');

  worksheet.addRow(['', 'Initial Period', 'Ending Period']);
  worksheet.addRow(['Weight', initialData.weight, endingData.weight]);
  worksheet.addRow(['Revenue', initialData.revenue, endingData.revenue]);
  worksheet.addRow(['Pieces', initialData.pieces, endingData.pieces]);
  worksheet.addRow(['Shipments', initialData.shipments, endingData.shipments]);

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};

