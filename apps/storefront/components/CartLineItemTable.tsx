import { XCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const columns = [
  { id: 'item', name: 'Item' },
  { id: 'name', name: 'Name' },
  { id: 'price', name: 'Price' },
  { id: 'quantity', name: 'Quantity' },
  { id: 'total', name: 'Total' },
  { id: 'remove', name: 'Remove' },
];

type ProductType = {
  product_name: string;
  product_price: number;
  product_id: string;
  product_name_slug: string;
  product_images: {
    id: string;
    src: string;
    alt: string;
  }[];
  quantityInCart?: number;
};

export default function CartLineItemTable({
  products,
  cartContext,
}: {
  products: ProductType[];
  cartContext: {
    cartItems: ProductType[];
    setCartItems: React.Dispatch<React.SetStateAction<ProductType[]>>;
    handleAddToCart: (product: ProductType, quantity: number) => number;
    handleUpdateCart: (product: ProductType, quantity: number) => number;
  };
}) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-7 gap-6 items-center rounded-md bg-gray-50 p-8">
      {columns.map((column) => (
        <p
          key={column.id}
          className={`${column.id === 'name' ? 'col-span-2' : ''} font-medium`}
        >
          {column.name}
        </p>
      ))}
      {products.map((lineItem) => {
        return (
          <Fragment key={lineItem.product_id}>
            <img
              src={lineItem.product_images[0].src}
              alt={lineItem.product_images[0].alt}
              className="min-w-20 max-w-20 min-h-20 max-h-20 object-fit rounded-md"
            />
            <Link
              className="col-span-2"
              href={`/${router.query.storeUrl}/product/${lineItem.product_id}/${lineItem.product_name_slug}`}
            >
              <p className="w-30 truncate">{lineItem.product_name}</p>
            </Link>
            <p>
              {' '}
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
              }).format(lineItem.product_price)}
            </p>
            <div className="w-16">
              <label
                className="sr-only"
                htmlFor={`quantity-${lineItem.product_id}`}
              >
                Quantity for {lineItem.product_name}
              </label>
              <input
                min={0}
                id={`${lineItem.product_id}`}
                className="w-16 rounded-md"
                type="number"
                name="quantity"
                value={
                  cartContext.cartItems.find(
                    (item) => item.product_id === lineItem.product_id
                  )?.quantityInCart || 0
                }
                onChange={(e) => {
                  if (e.target.value === '') return;
                  cartContext.handleUpdateCart(
                    lineItem,
                    Number(e.target.value)
                  );
                }}
              />
            </div>
            <p>
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
              }).format(
                lineItem.product_price *
                  Number(
                    cartContext.cartItems.find(
                      (item) => item.product_id === lineItem.product_id
                    )?.quantityInCart
                  ) ?? 1
              )}
            </p>
            <button
              className="flex items-center ml-4"
              onClick={() => {
                cartContext.setCartItems((prev: ProductType[]) =>
                  prev.filter((item) => item.product_id !== lineItem.product_id)
                );
              }}
            >
              <XCircleIcon className="w-6 text-red-500" />
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
