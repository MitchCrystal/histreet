import { Storefront } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type StorefrontDBresult = {
  id: string;
  storeName: string;
  storeDescription: string | null;
  supportEmail: string | null;
};

type StorefrontWithError = StorefrontDBresult | { error: boolean | string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StorefrontWithError>
) {
  if (req.method === 'GET') {
    try {
      const storeUrl = req.query.storeFrontItems;

      if (storeUrl == null)
        return res.status(400).json({ error: 'Store is required' });

      const store = await findStoreId(storeUrl as string);

      if (store == null) {
        return res.status(404).json({ error: 'Store not found' });
      }
      const storefront = await findStorefront(store?.store_id as string);

      if (storefront == null) {
        return res.status(404).json({ error: 'Storefront not found' });
      }
      return res.status(200).json({
        id: store.store_id,
        storeName: store.store_name,
        storeDescription: storefront.store_description,
        supportEmail: storefront.support_email,
      });
    } catch (error) {
      return res.status(500).json({ error: true });
    }
  }
}
//map through response and turn all null values to string
const findStoreId = async (storeUrl: string) => {
  const response = await prisma.store.findUnique({
    where: { store_url: storeUrl },
    select: {
      store_id: true,
      store_name: true,
    },
  });
  return response;
};

//map through response and turn all null values to string
const findStorefront = async (storeId: string) => {
  const response = await prisma.storefront.findFirst({
    where: { store_id: storeId },
    select: {
      support_email: true,
      store_description: true,
    },
  });
  return response;
};
