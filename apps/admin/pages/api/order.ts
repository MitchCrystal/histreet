import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from 'database';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { orderId } = req.query;
    console.log('orderid', orderId);
    try {
      const order = await prisma.order.findUnique({
        where: {
          //@ts-ignore
          order_id: orderId,
        },
      });
      if (!order) throw new Error('id is required');
      res.status(200).send({ order });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

export async function getOrder(orderId: any) {
  const order = await prisma.order.findUnique({
    where: {
      order_id: orderId,
    },
  });
  if (!order) throw new Error('id is required');
  return order;
}
