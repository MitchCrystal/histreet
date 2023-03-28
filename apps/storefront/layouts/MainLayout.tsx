import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Error from '../components/Error';
import Loading from '../components/Loading';


export default function MainLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  const router = useRouter();
  const {
    data: storeDetails,
    isLoading,
    isError,
  } = useQuery(
    ['products'],
    () => fetch('/api/' + router.query.storeUrl).then((res) => res.json()),
    {
      enabled: !!router.query.storeUrl,
    }
    );
  if (isLoading) return <Loading />;
  if (isError) return <Error />;


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Highstreet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <AnnouncementBar />
      <div className="flex flex-col gap-8 justify-between min-h-screen">
        <Navbar storeName={title} logoSrc={storeDetails.logoUrl} />
        <div className="flex-1 min-h-full max-w-[1200px] m-auto w-full px-6">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
