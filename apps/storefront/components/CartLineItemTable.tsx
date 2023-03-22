import InputWithLabel from './InputWithLabel';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { CartProduct } from '../pages/[storeUrl]/cart';
import Loading from './Loading';

const columns = [
  { id: 'item', name: 'Item' },
  { id: 'name', name: 'Name' },
  { id: 'price', name: 'Price' },
  { id: 'quantity', name: 'Quantity' },
  { id: 'total', name: 'Total' },
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
  setOrderTotal,
}: {
  products: CartProduct;
  cartContext: {
    cartItems: ProductType[];
    setCartItems: React.Dispatch<React.SetStateAction<ProductType>>;
    handleAddToCart: (product: ProductType, quantity: number) => number;
  };
  setOrderTotal: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  const [quantityValues, setQuantityValues] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    if (Object.entries(quantityValues).length !== 0) return;
    const obj: Record<string, number> = {};
    products.forEach((item) => {
      obj[item.product_id] =
        cartContext.cartItems.find(
          (cartItem) => cartItem.product_id === item.product_id
        )?.quantityInCart || 0;
    });
    setQuantityValues({ ...obj });
  }, [products, cartContext.cartItems, quantityValues]);

  console.log(cartContext.cartItems);

  useEffect(() => {
    setOrderTotal(
      products
        .map((item) => {
          return item.product_price * quantityValues[item.product_id];
        })
        .reduce((acc, curr) => acc + curr, 0)
    );
  }, [quantityValues, products, setOrderTotal]);

  if (Object.entries(quantityValues).length === 0) return <Loading />;

  return (
    <div className="grid grid-cols-5 gap-6 items-center rounded-md bg-gray-50 p-8">
      {columns.map((column) => (
        <p key={column.id} className="font-medium">
          {column.name}
        </p>
      ))}
      {products.map((lineItem) => {
        if (
          quantityValues[lineItem.product_id] <= 0 &&
          String(quantityValues[lineItem.product_id]) !== ''
        ) {
          return null;
        }
        return (
          <Fragment key={lineItem.product_id}>
            <img
              src={lineItem.product_images[0].src}
              alt={lineItem.product_images[0].alt}
              className="w-20 h-20 object-fit rounded-md"
            />
            <Link
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
              <InputWithLabel
                label="Quantity"
                name="quantity"
                id={String(lineItem.product_id)}
                type="number"
                state={quantityValues}
                showLabel={false}
                direction="column"
                setState={setQuantityValues}
                min={0}
                additionalOnChangeFunction={() => {
                  cartContext.handleAddToCart(
                    lineItem,
                    Number(quantityValues[lineItem.product_id])
                  );
                }}
              />
            </div>
            <p>
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
              }).format(
                lineItem.product_price * quantityValues[lineItem.product_id]
              )}
            </p>
          </Fragment>
        );
      })}
    </div>
  );
}
