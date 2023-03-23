import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Button from '../components/Button';

export default function AdminLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  const router = useRouter();
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
    {
      name: 'Visit Store',
      href: `${process.env.NEXT_PUBLIC_STOREFRONT_URL}/`,
      current: false,
    },
  ];
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Highstreet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <div className="mx-auto flex h-12 justify-between items-center w-full border-slate-200 border-b ">
        <Bars3Icon
          className="h-6 ml-4 md:hidden cursor-pointer"
          onClick={() => setIsNavOpen((prev) => !prev)}
        />
        <div className="flex justify-end md:justify-between w-full">
          <Link href={`/admin/${router.query.storeUrl}/dashboard`}>
            <div className="flex ml-4 text-2xl">Logo</div>
          </Link>
          <div className="flex mr-4 text-2xl">Store name</div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-48px)] flex-col md:flex-row">
        <nav className="hidden md:flex flex-col justify-between border-slate-200 border-r w-40 text-xs">
          <div className="flex flex-col justify-between px-3 pt-3">
            {initialNavigation.map((page, index) => {
              return (
                <Link href={page.href} key={index}>
                  <div className="px-3 pt-3 text-base">{page.name}</div>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col items-center border-t w-full px-3 py-3 ">
            <Button
              size="sm"
              appearance="link"
              type="button"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-base  text-red-600"
            >
              Log Out
            </Button>
          </div>
        </nav>
        <nav
          className={
            isNavOpen
              ? 'w-full flex-col text-center border-slate-200 border-r text-xs md:hidden'
              : 'hidden'
          }
        >
          <div className="flex flex-col justify-between px-3 pt-3">
            {initialNavigation.map((page, index) => {
              return (
                <Link href={page.href} key={index}>
                  <div
                    className="px-3 py-3 text-base"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                  >
                    {page.name}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col items-center border-t w-full px-3 py-3 text-base">
            <div
              className="flex flex-col items-center border-y w-full px-3 py-3 text-base text-red-600"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <Button
                size="sm"
                appearance="link"
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-base  text-red-600"
              >
                Log Out
              </Button>
            </div>
          </div>
        </nav>
        <div className="m-4">{children}</div>
      </div>
    </>
  );
}
