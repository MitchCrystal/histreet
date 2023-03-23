// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../../utils/prisma';

export default async function createAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const values = await req.body;
    const hashedPassword = bcrypt.hashSync(values.password, 10);
    const user = await prisma.user.create({
      data: {
        user_first_name: values.firstName,
        user_last_name: values.lastName,
        user_email: values.email,
        password_hash: hashedPassword,
      },
    });
    const store = await prisma.store.create({
      data: {
        store_url: values.storeURL,
        store_name: values.storeName,
        user: {
          connect: {
            user_id: user.user_id,
          },
        },
      },
    });
    await prisma.storefront.create({
      data: {
        store: {
          connect: {
            store_id: store.store_id,
          },
        },
      },
    });

    res.status(201).send({ created: true });
  } catch (e) {
    console.log(e);
    res.status(500).send('teapot');
  }
}
