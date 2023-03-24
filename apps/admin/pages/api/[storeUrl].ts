// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const storeUrl = req.query.storeUrl?.toString();
  if (storeUrl == null) {
    return res.status(400);
  } else {
    const storeId = await findStoreId(storeUrl);
    return res.status(200).json(storeId?.store_id);
  }
}

const findStoreId = async (storeUrl: string) => {
  if (storeUrl) {
    const response = await prisma.store.findFirst({
      where: { store_url: storeUrl },
      select: {
        store_id: true,
      },
    });
    return response;
  }
};
