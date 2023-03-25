// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data = { order_id: string } | { message: string } | { error: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { paymentId } = req.query;

    const order = await prisma.order.findFirst({
      where: {
        payment_id: paymentId as string,
      },
      select: {
        order_id: true,
      },
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order with payment id not found' });
    }
  } catch (err) {
    res.status(500).json({ error: true });
  }
}
