import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import Logo from '../components/Logo';

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
      <div className="flex mt-12 items-center flex-col h-screen">
        <div className="flex items-center justify-center gap-4">
          <img
            src={'/histreet-yellow-square.png'}
            alt="Hi Street"
            className="w-16 mb-8"
          />
        </div>
        <div className="text-center box-border lg:border shadow rounded-md lg:py-12 px-20 mx-auto flex flex-col justify-between items-center">
          {children}
        </div>
      </div>
    </>
  );
}
