import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

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
    ['layout-store-details'],
    () => fetch('/api/' + router.query.storeUrl).then((res) => res.json()),
    {
      enabled: !!router.query.storeUrl,
    }
  );

  function getSelected(type: string) {
    return isLoading ? '#ffffff': (!storeDetails.globalStyles || storeDetails.globalStyles === 'null') ? undefined:
    JSON.parse(storeDetails.globalStyles).find(
      (item: any) => item.type === type
    ).selected;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Highstreet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <AnnouncementBar
        backgroundColour={getSelected('secondaryColour') ?? 'rgba(31, 41, 55)'}
      />
      <div
        className="flex flex-col gap-8 justify-between min-h-screen"
        style={{
          backgroundColor: getSelected('primaryColour') ?? 'white',
        }}
      >
        <Navbar
          storeName={isLoading || isError ? '' : storeDetails.name}
          logoSrc={isLoading || isError ? null : storeDetails.logoUrl}
        />
        <div className="flex-1 min-h-full max-w-[1200px] m-auto w-full px-6">
          {children}
        </div>
        <Footer
          backgroundColour={
            getSelected('secondaryColour') ?? 'rgba(31, 41, 55)'
          }
        />
      </div>
    </>
  );
}
