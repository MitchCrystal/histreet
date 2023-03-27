import { Prisma } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';

type Data =
  | {
      product_name: string;
      description: string;
      product_price: Prisma.Decimal;
      product_id: string;
      product_images: any;
      inventory_qty: number;
      is_active: boolean;
    }
  | { error: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { productId } = req.query;

    if (!productId || productId === undefined) {
      throw new Error('Product ID is required');
    }
    const product = await prisma.product.findUnique({
      where: {
        product_id: String(productId),
      },
      select: {
        product_name: true,
        description: true,
        product_price: true,
        product_images: true,
        product_id: true,
        inventory_qty: true,
        is_active: true,
      },
    });

    if (product && product.is_active) {
      res.status(200).json(product);
    } else {
      throw new Error('Product not found');
    }
  } catch (err) {
    return res.status(500).json({ error: true });
  }
}
