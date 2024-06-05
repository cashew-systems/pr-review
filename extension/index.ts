import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

const sendEmail = async (email: string, pdfBuffer: Buffer) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Sales Variance Report',
    attachments: [
      {
        filename: 'report.pdf',
        content: pdfBuffer,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

app.post('/generate-report', async (req: Request, res: Response) => {
  const { customerId, initialStart, initialEnd, endingStart, endingEnd } = req.body;

  try {
    const initialOrders = await prisma.order.findMany({
      where: {
        customerId,
        date: { gte: new Date(initialStart), lte: new Date(initialEnd) },
      },
    });

    const endingOrders = await prisma.order.findMany({
      where: {
        customerId,
        date: { gte: new Date(endingStart), lte: new Date(endingEnd) },
      },
    });

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

    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).send('Error generating report');
  }
});

app.post('/send-email', async (req: Request, res: Response) => {
  const { email, pdf } = req.body;

  try {
    const pdfBuffer = Buffer.from(pdf, 'base64');
    await sendEmail(email, pdfBuffer);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

