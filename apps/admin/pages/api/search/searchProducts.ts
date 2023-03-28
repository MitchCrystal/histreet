import { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';


type Product = {
    product_id: string;
    product_name: string;
    description:string;
    tags:String;
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
            product_name: {
            contains: query,
            mode: 'insensitive', 
          },
            description: {
            contains: query,
            mode: 'insensitive', 
          },
            tags: {
            contains: query,
            mode: 'insensitive', 
          },
        ]}
      })
      
      // await prisma.searchQuery.create({
      //   data: {
      //     query,
      //   },
      // });

    res.status(200).json({ products });
    } catch (error: any) {
      console.log(error);
      res.status(500).end();
    }
  }
}
