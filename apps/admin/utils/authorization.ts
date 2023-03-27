import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import PrismaStrUrl from './storeUrl';

export default async function ServerSideProps(
  context: GetServerSidePropsContext
) {
  const session = await getSession(context);
  const userId = session?.user.id;
  const currentStoreUrl = context.query.storeUrl
  const prismaStoreUrl = await PrismaStrUrl(userId);
  if (!session || !currentStoreUrl || !prismaStoreUrl.includes(String(currentStoreUrl))) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
