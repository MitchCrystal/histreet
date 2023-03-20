import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
// import Image from 'next/image';

export default function AdminLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  const initialNavigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      current: true,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      current: false,
    },
    {
      name: 'Products',
      href: '/admin/products',
      current: false,
    },
    {
      name: 'Store Editor',
      href: '/admin/Editor',
      current: false,
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Highstreet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <div className="mx-auto flex flex-row h-12 justify-between items-center w-full border-slate-200 border-b ">
        <div className="flex ml-4">Logo</div>
        <div className="flex mr-4">Store name</div>
      </div>
      <div className="flex h-[calc(100vh-48px)]">
        <nav className="flex flex-col justify-between border-slate-200 border-r w-40 text-xs ">
          <div className="flex flex-col justify-between px-3 pt-3">
            {initialNavigation.map((page) => {
              return <div className='px-3 pt-3'>{page.name}</div>;
            })}
          </div>
          <div className="flex flex-col items-center border-t w-full px-3 py-3 ">
            Log Out
          </div>
        </nav>
        <div className="m-4">{children}</div>
      </div>
    </>
  );
}
