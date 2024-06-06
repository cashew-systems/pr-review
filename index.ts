import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

app.post('/generate-report', async (req: Request, res: Response) => {
  const { customerId, initialStart, initialEnd, endingStart, endingEnd } = req.body;

  await prisma.$executeRaw`SET statement_timeout = 180000;`; // There is a large amount of data so manually set the statement timeout to 3 minutes

  let initialOrders, endingOrders;

  // Allow user to generate for all customers together or just one customer
  if (customerId) {
    initialOrders = await prisma.$queryRawUnsafe(`
      SELECT * FROM orders WHERE customerId = ${customerId} AND date >= '${initialStart}' AND date <= '${initialEnd}'
    `);

    endingOrders = await prisma.$queryRawUnsafe(`
      SELECT * FROM orders WHERE customerId = ${customerId} AND date >= '${endingStart}' AND date <= '${endingEnd}'
    `);
  } else {
    initialOrders = await prisma.$queryRawUnsafe(`
      SELECT * FROM orders WHERE date >= '${initialStart}' AND date <= '${initialEnd}'
    `);

    endingOrders = await prisma.$queryRawUnsafe(`
      SELECT * FROM orders WHERE date >= '${endingStart}' AND date <= '${endingEnd}'
    `);
  }

  res.status(200).json({ initialOrders, endingOrders });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

