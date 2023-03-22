import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Customer = { customer_email: string } | { error: boolean | string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer>
) {
  if (req.method === 'GET') {
    try {
      const { customerId } = req.query;
      if (!customerId || customerId === undefined) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      const customer = await prisma.customer.findUnique({
        where: {
          customer_id: String(customerId),
        },
        select: {
          customer_email: true,
        },
      });
      if (customer) {
        res.status(200).json(customer);
      } else {
        return res.status(404).json({ error: 'Customer not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: true });
    }
  }
}
