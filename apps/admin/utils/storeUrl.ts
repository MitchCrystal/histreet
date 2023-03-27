import prisma from './prisma';

export default async function PrismaStrUrl(userId:string){
  const storeOwned = await prisma.user.findMany({
    where: {
      user_id: String(userId),
    },
    select: {
      store: {
        select: {
          store_url: true,
        },
      },
    },
  });
  const prismaStoreUrl = storeOwned[0].store[0].store_url
  return prismaStoreUrl
}