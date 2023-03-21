import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from 'database';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { id } = req.query;
    console.log('addressId', id);
    try {
      const address = await prisma.address.findFirst({
        where: {
          address_id: id,
        },
      });
      console.log('address', address);
      if (!address) throw new Error('address id is required');
      res.status(200).send(address);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}


