import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type StorefrontDBresult = {
  id: string;
  storeName: string;
  storeDescription: string | null;
  supportEmail: string | null;
  storeHeroImage: any;
  storeLogo: any;
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
        storeHeroImage: storefront.store_hero_image,
        storeLogo: storefront.store_logo,
      });
    } catch (error) {
      return res.status(500).json({ error: true });
    }
  } else {
    const storefrontReq = {
      id: req.body.id,
      storeName: req.body.storeName,
      storeDescription: req.body.storeDescription,
      supportEmail: req.body.supportEmail,
      storeHeroImage: req.body.storeHeroImage,
      storeLogo: req.body.storeLogo,
    };

    updateStorefrontDB(storefrontReq);
    return res.status(200).json(storefrontReq);
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

const updateStorefrontDB = async (storefrontReq: StorefrontDBresult) => {
  await prisma.$transaction([
    prisma.store.update({
      where: { store_id: storefrontReq.id },
      data: { store_name: storefrontReq.storeName },
    }),
    prisma.storefront.update({
      where: { store_id: storefrontReq.id },
      data: {
        support_email: storefrontReq.supportEmail,
        store_description: storefrontReq.storeDescription,
        store_logo: storefrontReq.storeLogo,
        store_hero_image: storefrontReq.storeHeroImage,
      },
    }),
  ]);
};
