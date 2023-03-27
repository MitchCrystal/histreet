import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CartContext } from '../_app';

export default function ProcessingOrder() {
  const router = useRouter();
  const {
    setCartItems,
  }: { setCartItems: React.Dispatch<React.SetStateAction<any>> } =
    useContext(CartContext);

  const {
    data: orderId,
    isLoading,
    isError,
  } = useQuery(
    ['order'],
    () =>
      fetch('/api/checkout/' + router.query.payment_intent).then((res) =>
        res.json()
      ),
    {
      enabled: !!router.isReady && !!router.query.payment_intent,
      retry: 5,
      retryDelay: 1000,
    }
  );

  useEffect(() => {
    setCartItems([]);
  }, []);

  if (isError || (router.isReady && !router.query.payment_intent))
    return (
      <p>
        Sorry, an error occured loading this page. Your order has still been
        processed.
      </p>
    );

  if (
    !isLoading &&
    orderId.order_id &&
    orderId.order_id &&
    router.query.storeUrl
  ) {
    // console.log(
    //   `/${router.query.storeUrl}/${orderId.order_id}/order-confirmation`
    // );
    router.push(
      `/${router.query.storeUrl}/${orderId.order_id}/order-confirmation`
    );
  }

  return <div>Processing...</div>;
}