// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

type StoreData = {
  id: string;
  name: string;
  heroUrl: string;
  heroAlt: string;
  logoUrl: string;
  description: string;
};

type StoreFrontData = {
  support_email: string | null;
  store_description: string | null;
  store_logo: Prisma.JsonObject;
  store_hero_image: Prisma.JsonObject;
};

type StoreDataWithError = StoreData | { error: boolean | string };

const tempImage =
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreDataWithError>
) {
  try {
    const storeUrl = req.query.storeUrl;

    if (storeUrl == null)
      return res.status(400).json({ error: 'Store is required' });

    const store = await findStoreId(storeUrl as string);

    if (store == null) {
      return res.status(404).json({ error: 'Store not found' });
    }
    const storefront = await findStorefront(store?.store_id) as StoreFrontData;

    if (storefront == null) {
      return res.status(404).json({ error: 'Storefront not found' });
    }

    return res.status(200).json({
      id: store.store_id,
      name: store.store_name,
      heroUrl:
        storefront && storefront.store_hero_image
          ? (storefront.store_hero_image.src as string)
          : tempImage,
      heroAlt:
        storefront && storefront.store_hero_image
          ? (storefront.store_hero_image.alt as string)
          : 'image of multi-coloured shirts',
      logoUrl:
        storefront && storefront.store_logo
          ? (storefront.store_logo.src as string)
          : '',
      description:
        storefront && storefront.store_description
          ? storefront.store_description
          : 'Welcome to our store',
    });
  } catch (error) {
    return res.status(500).json({ error: true });
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
      store_description: true,
      store_logo: true,
      store_hero_image: true,
    },
  });
  return response;
};
