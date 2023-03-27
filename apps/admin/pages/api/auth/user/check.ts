import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email;
  const storeURL = req.query.storeURL;
  try {
    const emailExists = await prisma.user.findFirst({
      where: {
        user_email: String(email),
      },
    });
    const storeURLExists = await prisma.store.findFirst({
      where: {
        store_url: String(storeURL),
      },
    });
    if (emailExists) {
      res.status(200).json({ message: 'email already exists' });
    }
    if (storeURLExists) {
      res.status(200).json({ message: 'storeURL already exists' });
    }
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}
