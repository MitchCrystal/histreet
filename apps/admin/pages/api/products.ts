// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

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
  const storeId = req.query.store_id?.toString();
  if (storeId == null) {
    return res.status(400);
  } else {
    const products = await findProducts(storeId);
    console.log('products' + products);
    return res.status(200).json(products);
  }
}

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
  console.log('product' + JSON.stringify(response));
  return response;
};
