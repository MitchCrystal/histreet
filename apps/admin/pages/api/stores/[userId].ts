// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.userId;
  if (userId == null) {
    return res.status(400);
  } else {
    const stores = await prisma.store.findMany({
      where: {
        store_owner_id: String(userId),
      },
      select: {
        store_id: true,
        store_name: true,
        store_url: true,
      },
    });
    return res.status(200).json(stores);
  }
}
