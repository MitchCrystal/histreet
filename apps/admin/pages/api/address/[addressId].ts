import { Address } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type AddressWithError = Address | { error: boolean | string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddressWithError>
) {
  if (req.method === 'GET') {
    try {
      const { addressId } = req.query;
      if (!addressId || addressId === undefined) {
        return res.status(404).json({ error: 'Address not found' });
      }
      const address = await prisma.address.findUnique({
        where: {
          address_id: String(addressId),
        },
      });
      if (address) {
        res.status(200).json(address);
      } else {
        return res.status(404).json({ error: 'Address not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: true });
    }
  }
}
