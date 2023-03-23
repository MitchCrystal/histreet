import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const values = await req.body;
    const product = await prisma.product.create({
      data: {
        SKU: values.SKU,
        product_name: values.product_name,
        product_price: Number(values.product_price),
        product_name_slug: slugify(values.product_name),
        store: values.store_id,
      },
    });

    res.status(201).send({ created: true });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}
