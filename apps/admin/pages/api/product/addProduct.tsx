import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const values = await req.body;
    const createdProduct = await prisma.product.create({
      data: {
        SKU: values.SKU,
        product_name: values.product_name,
        product_price: values.product_price,
        product_name_slug: values.product_name_slug,
        store_id: values.store_id,
      },
    });
    const product_id = createdProduct.product_id;
    res.status(201).send({ product_id });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}
