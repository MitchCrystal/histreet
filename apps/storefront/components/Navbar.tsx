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
import { useContext } from 'react';
import { CartContext } from '../pages/_app';

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

export default function Navbar() {
  const router = useRouter();

  const {
    cartItems,
    totalItemsInCart,
  }: { cartItems: any; totalItemsInCart: any } = useContext(CartContext);

  console.log({ cartItems });

  return (
    <>
      <nav className="py-8 px-4 border-b border-gray-300">
        <div className="max-w-[1200px] m-auto flex items-center justify-between">
          <Link href={`/${router.query.storeUrl}`}>
            {/* @TODO change to dynamic value */}
            <Logo logoSrc={''} storeName="Demo Store" />
          </Link>
          <div className="sm:hidden flex gap-4">
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
          <div className="hidden sm:flex sm:gap-4">
            {menuItems.map((item) => (
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
                    {item.id === 'cart' && (
                      <div>
                        {totalItemsInCart() > 0 && (
                          <p>({totalItemsInCart()})</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
