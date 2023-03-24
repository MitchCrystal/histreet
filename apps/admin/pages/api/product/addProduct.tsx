import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function createProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const values = await req.body;
    console.log('values passed', values);
    await prisma.product.create({
      data: {
        SKU: values.SKU,
        product_name: values.product_name,
        product_price: values.product_price,
        product_name_slug: values.product_name_slug,
        store_id: values.store_id,
      },
    });

    res.status(201).send({ created: true });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}
