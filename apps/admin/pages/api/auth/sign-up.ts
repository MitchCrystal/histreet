// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../../utils/prisma';

type Data = {
  name: string;
};

type formValues = {
  email: string;
  storeName: string;
  storeURL: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default async function createAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const values = await req.body
    const hashedPassword = bcrypt.hashSync(values.password, 10);
    const User = await prisma.user
      .create({
        data: {
          user_first_name: values.firstName,
          user_last_name: values.lastName,
          user_email: values.email,
          password_hash: hashedPassword,
        },
      })
      res.status(201).send(User.user_id)
  } catch (e) {
    console.log(e);
    res.status(500).send('You suck');
  }
}
