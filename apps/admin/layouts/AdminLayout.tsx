import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';

// import Image from 'next/image';

export default function AdminLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  const router = useRouter()
  const initialNavigation = [
    {
      name: 'Dashboard',
      href: `/admin/${router.query.storeUrl}/dashboard`,
      current: true,
    },
    {
      name: 'Orders',
      href: `/admin/${router.query.storeUrl}/orders`,
      current: false,
    },
    {
      name: 'Products',
      href: `/admin/${router.query.storeUrl}/products`,
      current: false,
    },
    {
      name: 'Store Editor',
      href: `/admin/${router.query.storeUrl}/editor`,
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
        <Link href={`/admin/${router.query.storeUrl}/dashboard`}><div className="flex ml-4 text-2xl">Logo</div></Link>
        <div className="flex mr-4 text-2xl">Store name</div>
      </div>
      <div className="flex h-[calc(100vh-48px)]">
        <nav className="flex flex-col justify-between border-slate-200 border-r w-40 text-xs ">
          <div className="flex flex-col justify-between px-3 pt-3">
            {initialNavigation.map((page, index) => {
              return <Link href={page.href}  key={index}><div className='px-3 pt-3 text-base'>{page.name}</div></Link>;
            })}
          </div>
          <Link href='/auth/sign-in'>
          <div className="flex flex-col items-center border-t w-full px-3 py-3 text-base">
            Log Out
          </div>
          </Link>
        </nav>
        <div className="m-4">{children}</div>
      </div>
    </>
  );
}
