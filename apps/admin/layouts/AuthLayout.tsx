import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AuthLayout({
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
      <div className="text-center box-border lg:border border-black lg:py-20 px-20 mx-auto h-4/5 flex flex-col justify-between items-center max-w-lg lg:mt-40">
        {children}
      </div>
    </>
  );
}
