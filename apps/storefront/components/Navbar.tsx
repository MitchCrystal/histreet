import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import CartSlideOut from './CartSlideOut';

type Props = {
  logoSrc: string
  storeName: string
}

const menuItems = [
  {
    id: 'products',
    name: 'Products',
    href: '/products',
  },
  {
    id: 'cart',
    name: 'Cart',
    href: '/cart',
  },
];

export default function Navbar({ logoSrc, storeName }:Props) {
  const router = useRouter();

  return (
    <>
      <nav className="py-8 px-4 border-b border-gray-300">
        <div className="max-w-[1200px] m-auto flex items-center justify-between">
          <Link href={`/${router.query.storeUrl}`}>
            {/* @TODO change to dynamic value */}
            <Logo logoSrc={logoSrc} storeName={storeName} />
          </Link>
          <div className="md:hidden flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>Browse</DropdownMenuTrigger>
              <DropdownMenuContent>
                {menuItems.map((item) => {
                  if (item.id !== 'cart') {
                    return (
                      <Link
                        key={item.id}
                        href={`/${router.query.storeUrl}${item.href}`}
                      >
                        <DropdownMenuItem>{item.name}</DropdownMenuItem>
                      </Link>
                    );
                  }
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href={`/${router.query.storeUrl}/cart`}>
              <ShoppingCartIcon className="h-6" />
            </Link>
          </div>
          <div className="hidden md:flex md:gap-4">
            {menuItems.map((item) => {
              if (item.id !== 'cart') {
                return (
                  <Link
                    key={item.id}
                    href={`/${router.query.storeUrl}${item.href}`}
                  >
                    <div className="hover:bg-gray-100 py-2 px-4 rounded-md">
                      <div
                        className={`${
                          item.id === 'cart' && 'grid grid-cols-2 gap-2'
                        }`}
                      >
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </Link>
                );
              }
            })}
            <CartSlideOut />
          </div>
        </div>
      </nav>
    </>
  );
}
