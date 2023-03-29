import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type StorefrontEmail = {
  id: string;
  storeName: string;
  supportEmail: string | null;
};

type StorefrontWithError = StorefrontEmail | { error: boolean | string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StorefrontWithError>
) {
  if (req.method === 'GET') {
    try {
      const storeUrl = req.query.email;

      if (storeUrl == null)
        return res.status(400).json({ error: 'Email is required' });

      const store = await findStoreId(storeUrl as string);

      if (store == null) {
        return res.status(404).json({ error: 'Email not found' });
      }
      const storefront = await findStorefront(store?.store_id as string);

      if (storefront == null) {
        return res.status(404).json({ error: 'Storefront not found' });
      }
      return res.status(200).json({
        id: store.store_id,
        storeName: store.store_name,
        supportEmail: storefront !== null ? storefront.support_email : '',
      });
    } catch (error) {
      return res.status(500).json({ error: true });
    }
  }
}

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

const findStorefront = async (storeId: string) => {
  const response = await prisma.storefront.findFirst({
    where: { store_id: storeId },
    select: {
      support_email: true,
    },
  });
  return response;
};
