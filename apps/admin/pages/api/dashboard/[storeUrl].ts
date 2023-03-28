import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type Data = any

export default async function StoreName(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const stats = await prisma.store.findUnique({
      where: {
        store_url: req.query.storeUrl as string
      },
      select:{
        customers:{
          select:{
            customer_id:true,
          }
        },
        user:{
          select:{
            user_first_name:true,
          }
        },
        orders:{
          select:{
            total_order_cost:true,
          }
        }
      }
    })
    if(!stats) {
      res.status(404).json({message:'not found'})
    }
    res.status(200).json(stats)
  } catch (error) {
    res.status(500).json({message:'error'})
  }
}
