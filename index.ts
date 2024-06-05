import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import { generatePDFReport, generateExcelReport } from './reportGenerator';

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

app.post('/reports', async (req: Request, res: Response) => {
  const { customerId, initialStart, initialEnd, endingStart, endingEnd } = req.body;

  if (!customerId || !initialStart || !initialEnd || !endingStart || !endingEnd) {
    return res.status(400).send('Missing required fields');
  }

  if (new Date(endingEnd) <= new Date(initialStart)) {
    return res.status(400).send('Ending period must be after the initial period');
  }

  try {
    await prisma.$executeRaw`SET statement_timeout = 180000;`; // Manually setting the statement timeout to 3 minutes

    const initialOrders = await prisma.order.findMany({
      where: {
        customerId,
        date: { gte: new Date(initialStart), lte: new Date(initialEnd) },
      }
    });

    const endingOrders = await prisma.order.findMany({
      where: {
        customerId,
        date: { gte: new Date(endingStart), lte: new Date(endingEnd) },
      }
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

