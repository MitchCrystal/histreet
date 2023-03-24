import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext, ProductType } from '../pages/_app';
import Button from './Button';
import CartQuantityInput from './CartQuantityInput';
import EmptyCart from './EmptyCart';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet-base';

const columns = [
  { id: 'item', name: 'Item' },
  { id: 'details', name: 'Details' },
  { id: 'quantity', name: 'Quantity' },
  { id: 'total', name: 'Total' },
];

export default function CartSlideOut() {
  const router = useRouter();
  const {
    cartItems,
    totalItemsInCart,
  }: { totalItemsInCart: () => number; cartItems: ProductType[] } =
    useContext(CartContext);

  return (
    <Sheet>
      <SheetTrigger>
        Cart ({totalItemsInCart() ? totalItemsInCart() : '0'})
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {totalItemsInCart() === 0
              ? ''
              : `You have ${totalItemsInCart()} item${
                  totalItemsInCart() > 0 ? 's' : ''
                } in your cart`}
          </SheetDescription>
        </SheetHeader>
        {totalItemsInCart() > 0 ? (
          <div className="flex gap-8 flex-col overflow-auto max-h-full">
            <div className="border-t border-gray-100 mt-2">
              <div className="grid-cols-5 mt-6 text-sm mx-3 lg:grid hidden">
                {columns.map((column) => (
                  <p
                    key={column.id}
                    className={`${
                      column.id === 'details' ? 'col-span-2' : ''
                    } ${column.id === 'total' ? 'text-center' : ''}`}
                  >
                    {column.name}
                  </p>
                ))}
              </div>
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="text-black mt-4 flex flex-col items-start lg:grid lg:grid-cols-5 lg:items-center text-center text-sm mx-3 gap-2"
                >
                  <img
                    src={item.product_images[0].src}
                    alt={item.product_images[0].alt}
                    className="w-12 h-12 rounded-md hidden lg:block"
                  />
                  <div className="lg:col-span-2 lg:flex lg:items-start lg:justify-center lg:flex-col">
                    <Link
                      href={`/${router.query.storeUrl}/product/${item.product_id}/${item.product_name_slug}`}
                    >
                      <p className="truncate text-left lg:w-32">
                        {item.product_name}
                      </p>
                    </Link>
                    <p className="hidden lg:inline">£{item.product_price}</p>
                  </div>
                  <div className="hidden lg:block">
                    <CartQuantityInput
                      lineItem={item}
                      additionalClassNames="text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-start gap-2 lg:hidden">
                    <p className="inline lg:hidden">£{item.product_price}</p>
                    <p className="lg:hidden">x{item.quantityInCart}</p>
                  </div>
                  <p className="hidden lg:block">
                    £{item.product_price * (item?.quantityInCart || 0)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center flex-col min-w-full gap-2">
              <Link href={`/${router.query.storeUrl}/cart`} className="w-full">
                <Button
                  size="default"
                  appearance="subtle"
                  additionalClasses="w-full"
                >
                  View full cart
                </Button>
              </Link>
              <Link
                href={`/${router.query.storeUrl}/checkout`}
                className="w-full"
              >
                <Button
                  size="default"
                  appearance="primary"
                  additionalClasses="w-full"
                >
                  Checkout •{' '}
                  {cartItems.reduce((acc, curr) => {
                    return (acc += curr.quantityInCart || 0);
                  }, 0)}{' '}
                  item
                  {cartItems.reduce((acc, curr) => {
                    return (acc += curr.quantityInCart || 0);
                  }, 0) > 1
                    ? 's'
                    : ''}
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <EmptyCart />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
