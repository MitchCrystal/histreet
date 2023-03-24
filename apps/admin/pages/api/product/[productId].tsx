import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data =
  | {
      product_name: string;
      SKU: string;
    }
  | { error: boolean };

export default async function productHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { method, body } = req;
    const { productId } = req.query;

    if (method === 'GET') {
      if (!productId || productId === undefined) {
        throw new Error('Product ID is required');
      }
      const product = await prisma.product.findUnique({
        where: {
          product_id: productId as string,
        },
      });

      if (product) {
        res.status(200).json(product);
      } else {
        throw new Error('Product not found');
      }
    } else if (method === 'PUT') {
      const newProduct = await prisma.product.update({
        where: {
          product_id: productId as string,
        },
        data: body,
      });
      res.status(200).json(newProduct);
    }
  } catch (err) {
    return res.status(500).json({ error: true });
  }
}
