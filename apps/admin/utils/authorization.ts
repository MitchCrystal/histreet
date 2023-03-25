import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default async function ServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
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