import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Button from '../components/Button';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/dist/server/api-utils';

import SearchInputs from '../components/SearchInputs';

type Store = {
  store_id: string;
  store_name: string;
  store_url: string;
};

export default function AdminLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>) {
  const router = useRouter();
  const logoSrc = '/histreet-yellow-square.png';
  const { storeUrl } = router.query;

  const { data: stores } = useQuery({
    queryKey: ['stores'],
    queryFn: () =>
      fetch(`/api/stores/${sessionStorage.getItem('userId')}`).then((res) =>
        res.json()
      ),
    enabled: !!router.isReady,
  });

  const [currentStoreUrl, setCurrentStoreUrl] = useState(storeUrl);

  const initialNavigation = [
    {
      name: 'Dashboard',
      href: `/admin/${currentStoreUrl}/dashboard`,
      current: true,
    },
    {
      name: 'Orders',
      href: `/admin/${currentStoreUrl}/orders`,
      current: false,
    },
    {
      name: 'Products',
      href: `/admin/${currentStoreUrl}/products`,
      current: false,
    },
    {
      name: 'Store Editor',
      href: `/admin/${currentStoreUrl}/editor`,
      current: false,
    },
    {
      name: 'Visit Store',
      href: `${process.env.NEXT_PUBLIC_STOREFRONT_URL}/${currentStoreUrl}`,
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
        <div className="flex justify-end md:justify-between items-center w-full">
          <Link href={`/admin/${storeUrl}/dashboard`}>
            <div className="hidden md:flex gap-2 ml-4 text-2xl place-content-center">
              <Image src={logoSrc} alt="company logo" width={40} height={40} />
              <div className="flex justify-center items-center">HiStreet</div>
            </div>
          </Link>

          <div className="flex  items-center">
            <SearchInputs />
          </div>

          <select
            id="stores"
            onChange={(e) => {
              setCurrentStoreUrl(e.target.value);
              router.push(`/admin/${e.target.value}/dashboard`);
            }}
            value={currentStoreUrl}
            className="mr-4 w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {stores?.map((store: Store) => {
              return (
                <option value={store.store_url} key={store.store_id}>
                  {store.store_name}
                </option>
              );
            })}
          </select>
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
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  sessionStorage.clear();
                }}
                className="text-base  text-red-600"
              >
                Log Out
              </Button>
            </div>
          </div>
        </nav>
        <div className="m-4 w-[95%]">{children}</div>
      </div>
    </>
  );
}
