import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function ProcessingOrder() {
  const router = useRouter();

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
    }
  );

  if (isError || (router.isReady && !router.query.payment_intent))
    return (
      <p>
        Sorry, an error occured loading this page. Your order has still been
        processed.
      </p>
    );

  if (!isLoading && orderId && router.query.storeUrl) {
    router.push(`/${router.query.storeUrl}/${orderId}/order-confirmation`);
  }

  return <div>Processing...</div>;
}
