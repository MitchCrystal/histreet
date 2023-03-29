import { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type ProductDTO = {
  product_id: string;
  product_name: string;
  SKU: string;
  inventory_qty: string;
  product_price: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { q: query } = req.query;

      if (typeof query !== 'string') {
        throw new Error('Invalid request');
      }

      const products = await prisma.product.findMany({
        where: {
          OR: [
            {
              product_name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              tags: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        select: {
          product_id: true,
          product_name: true,
          SKU: true,
          inventory_qty: true,
          product_price: true,
        },
      });

      // await prisma.searchQuery.create({
      //   data: {
      //     query,
      //   },
      // });

      //  return res.status(200).json({ products });
      return res.status(200).json(products);
    } catch (error: any) {
      console.log(error);
      return res.status(500).end();
    }
  }
}
