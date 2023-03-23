import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data =
  | {
      product_name: string;
      SKU: string;
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
        SKU: true,
      },
    });

    if (product) {
      res.status(200).json(product);
    } else {
      throw new Error('Product not found');
    }
  } catch (err) {
    return res.status(500).json({ error: true });
  }
}
