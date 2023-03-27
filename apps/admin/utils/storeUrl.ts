import prisma from './prisma';

export default async function prismaStrUrl(userId:string){
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
  const prismaStoreUrl = storeOwned[0].store.map(strUrl=> {
    return strUrl.store_url
  })
  return prismaStoreUrl
}