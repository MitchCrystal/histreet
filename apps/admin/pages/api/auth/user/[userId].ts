// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { userId } = req.query;
    const storeUrl = await prisma.user.findFirst({
      where: {
        user_id: String(userId),
      },
      select: {
        store: true,
      },
    });
    if (storeUrl) {
      res.status(200).json(storeUrl);
    } else {
      throw new Error('error');
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
}
