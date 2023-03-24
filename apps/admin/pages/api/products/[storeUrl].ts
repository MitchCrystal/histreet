// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Product = {
  product_id: string;
  product_name: string;
  SKU: string;
  inventory_qty: number;
  product_price: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const storeUrl = req.query.storeUrl?.toString();
  if (storeUrl == null) {
    return res.status(400);
  } else {
    const store_id = await findStoreId(storeUrl as string);
    const products = await findProducts(store_id?.store_id as string);
    return res.status(200).json(products);
  }
}

const findStoreId = async (storeUrl: string) => {
  const response = await prisma.store.findFirst({
    where: { store_url: storeUrl },
    select: {
      store_id: true,
    },
  });
  return response;
};

const findProducts = async (storeId: string) => {
  const response = await prisma.product.findMany({
    where: { store_id: storeId },

    select: {
      product_id: true,
      product_name: true,
      SKU: true,
      inventory_qty: true,
      product_price: true,
    },
  });
  return response;
};
