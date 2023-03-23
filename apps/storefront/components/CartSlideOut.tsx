import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext, ProductType } from '../pages/_app';
import Button from './Button';
import CartQuantityInput from './CartQuantityInput';
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
              ? 'Your cart is empty'
              : `You have ${totalItemsInCart()} item${
                  totalItemsInCart() > 0 ? 's' : ''
                } in your cart`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex gap-8 flex-col overflow-auto max-h-full">
          <div className="border-t border-gray-100 mt-2">
            <div className="grid grid-cols-5 mt-6 text-sm mx-3">
              {columns.map((column) => (
                <p
                  key={column.id}
                  className={`${column.id === 'details' ? 'col-span-2' : ''} ${
                    column.id === 'total' ? 'text-center' : ''
                  }`}
                >
                  {column.name}
                </p>
              ))}
            </div>
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="text-black mt-4 grid grid-cols-5 items-center text-center text-sm mx-3"
              >
                <img
                  src={item.product_images[0].src}
                  alt={item.product_images[0].alt}
                  className="w-12 h-12 rounded-md"
                />
                <div className="col-span-2 flex items-start justify-center flex-col">
                  <Link
                    href={`/${router.query.storeUrl}/product/${item.product_id}/${item.product_name_slug}`}
                  >
                    <p className="truncate">{item.product_name}</p>
                  </Link>
                  <p>£{item.product_price}</p>
                </div>
                <CartQuantityInput
                  lineItem={item}
                  additionalClassNames="text-sm"
                />
                <p>£{item.product_price * (item?.quantityInCart || 0)}</p>
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
