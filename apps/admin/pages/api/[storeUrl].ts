// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const storeUrl = req.query.storeUrl?.toString();
  if (storeUrl == null) {
    return res.status(400);
  } else {
    const storeId = await findStoreId(storeUrl);
    console.log('storeId from backend', storeId);
    return res.status(200).json('hi');
  }
}

const findStoreId = async (storeUrl: string) => {
  const response = await prisma.store.findFirst({
    where: { store_url: storeUrl },
    select: {
      store_id: true,
    },
  });
  console.log('res', response);
  return response;
};
