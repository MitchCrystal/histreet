import { Prisma } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data =
  | {
      product_name: string;
      product_price: Prisma.Decimal;
      product_id: string;
      product_name_slug: string;
      product_images: any;
      inventory_qty: number;
    }[]
  | { error: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { storeUrl } = req.query;

    if (!storeUrl) {
      throw new Error('Store URL is required');
    }

    const store = await prisma.store.findUnique({
      where: {
        store_url: String(storeUrl),
      },
      select: {
        store_id: true,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        store_id: store?.store_id,
        is_active: true,
      },
      select: {
        product_name: true,
        product_price: true,
        product_images: true,
        product_id: true,
        product_name_slug: true,
        inventory_qty: true,
      },
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: true });
  }
}
