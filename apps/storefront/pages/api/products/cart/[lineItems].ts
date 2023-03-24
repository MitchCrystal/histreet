import { Prisma } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';

type Data =
  | {
      product_name: string;
      product_price: Prisma.Decimal;
      product_id: string;
      product_name_slug: string;
      product_images: Prisma.JsonValue;
    }[]
  | { error: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { lineItems } = req.query;

    if (!lineItems || JSON.parse(String(lineItems)).length === 0) {
      throw new Error('No products in cart');
    }

    const cartProducts = await prisma.product.findMany({
      where: {
        product_id: {
          in: JSON.parse(String(lineItems)),
        },
        is_active: true,
      },
      select: {
        product_name: true,
        product_price: true,
        product_images: true,
        product_id: true,
        product_name_slug: true,
      },
    });

    return res.status(200).json(cartProducts);
  } catch (err) {
    return res.status(500).json({ error: true });
  }
}
