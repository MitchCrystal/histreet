import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MainLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
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
        <Navbar />
        <div className="flex-1 min-h-full max-w-[1200px] m-auto w-full px-6">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
