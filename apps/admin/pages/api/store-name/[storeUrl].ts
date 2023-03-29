import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data = {
  storeName:string
} | {
  message:string
}

export default async function StoreName(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const storeName = await prisma.store.findUnique({
      where: {
        store_url: req.query.storeUrl as string
      },
      select:{
        store_name:true
      }
    })
    if(!storeName) {
      res.status(404).json({message:'not found'})
    }
    res.status(200).json({storeName:String(storeName?.store_name)})
  } catch (error) {
    res.status(500).json({message:'error'})
  }
}
