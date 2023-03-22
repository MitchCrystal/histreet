import Button from '../../components/Button';
import CartLineItemTable from '../../components/CartLineItemTable';
import HeadingText from '../../components/HeadingText';
import MainLayout from '../../layouts/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useContext } from 'react';
import { CartContext } from '../_app';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

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

function Cart() {
  const router = useRouter();
  const cart: {
    cartItems: ProductType[];
    setCartItems: React.Dispatch<React.SetStateAction<ProductType>>;
    handleAddToCart: (product: ProductType, quantity: number) => number;
    handleUpdateCart: (product: ProductType, quantity: number) => number;
  } = useContext(CartContext);

  const {
    data: products,
    isLoading,
    isError,
  }: UseQueryResult<ProductType, unknown> = useQuery({
    queryKey: ['cart-products'],
    queryFn: () =>
      fetch(
        `/api/products/cart/${JSON.stringify(
          cart.cartItems.map((item) => item.product_id)
        )}`
      ).then((res) => res.json()),
    enabled: !!router.isReady,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (!Array.isArray(products)) return <p>Cart is empty</p>;
  return (
    <>
      <HeadingText size="h3">Cart</HeadingText>
      <div className="md:grid sm:grid-cols-9 mt-8 flex flex-col gap-8 w-full">
        <div className="col-span-6">
          <div className="overflow-auto">
            <div className="min-w-[500px] ">
              <CartLineItemTable products={products} cartContext={cart} />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Link href={`/${router.query.storeUrl}/products`}>
              <Button
                size="default"
                appearance="subtle"
                additionalClasses="mt-4"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-3 bg-gray-50 rounded-md p-4 flex flex-col h-fit">
          <div className="m-2 mb-4">
            <div className="flex justify-between items-center mb-2">
              <HeadingText size="h4">Order Total</HeadingText>
              <HeadingText size="h4">
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(
                  cart.cartItems.reduce(
                    (acc, curr) =>
                      (acc += curr.product_price * (curr.quantityInCart ?? 0)),
                    0
                  )
                )}
              </HeadingText>
            </div>
            <p>
              Total items:{' '}
              {cart.cartItems.reduce((acc, curr) => {
                return (acc += curr.quantityInCart || 0);
              }, 0)}
            </p>
          </div>
          <Button size="default" appearance="primary" additionalClasses="mb-2">
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
}

export default function () {
  return (
    <MainLayout title="Cart">
      <Cart />
    </MainLayout>
  );
}
