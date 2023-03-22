// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Order[]>
) {
  const storeId = req.query.store_id;
  const orders = await findOrders(storeId);
  res.status(200).json(orders);
}

const findOrders = async (storeId: string) => {
  const response = await prisma.order.findMany({
    // where: { store_id: storeId },

    select: {
      order_id: true,
      friendly_order_number: true,
      created_at: true,
      total_order_cost: true,
      order_details: true,
      customer: true,
    },
  });

  // sanitize data
  //delete order.customer.email;

  //console.log('Orders: ' + JSON.stringify(response));

  return response;
};
