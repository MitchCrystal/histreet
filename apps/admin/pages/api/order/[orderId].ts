import { Order } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type OrderWithError = Order | { error: boolean | string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderWithError>
) {
  if (req.method === 'GET') {
    try {
      const { orderId } = req.query;
      if (!orderId || orderId === undefined) {
        return res.status(404).json({ error: 'Order not found' });
      }
      const order = await prisma.order.findUnique({
        where: {
          order_id: String(orderId),
        },
      });
      if (order) {
        res.status(200).json(order);
      } else {
        return res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: true });
    }
  }
}
