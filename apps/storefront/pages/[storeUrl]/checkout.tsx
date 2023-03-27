import Logo from '../../components/Logo';
import { FormEvent, useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutWidget from '../../components/StripeCheckoutWidget';
import HeadingText from '../../components/HeadingText';
import CheckoutFormFields from '../../components/CheckoutFormFields';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartContext, ProductType } from '../_app';
import Head from 'next/head';
import Checkoutcard from '../../components/Checkoutcard';
import Loading from '../../components/Loading';
import CheckoutLayout from '../../layouts/CheckoutLayout';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const router = useRouter();
  const { cartItems }: { cartItems: ProductType[] } = useContext(CartContext);
  const [clientSecret, setClientSecret] = useState('');
  const [shippingInputs, setShippingInputs] = useState({
    email: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    firstLine: '',
    secondLine: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
  });

  const [checkbox, setCheckbox] = useState({
    is_billing_address_different: false,
  });

  const [billingInputs, setBillingInputs] = useState({
    billing_email: '',
    billing_phone_number: '',
    billing_firstName: '',
    billing_lastName: '',
    billing_firstLine: '',
    billing_secondLine: '',
    billing_city: '',
    billing_county: '',
    billing_postcode: '',
    billing_country: 'United Kingdom',
  });

  const [isOnPaymentScreen, setIsOnPaymentScreen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        store_url: router.query.storeUrl,
        products: cartItems,
        shippingAddress: shippingInputs,
        billingAddress: billingInputs,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    setIsOnPaymentScreen(true);
  };

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  } as any;

  useEffect(() => {
    if (router.isReady && cartItems.length === 0) {
      router.push(`/${router.query.storeUrl}/cart`);
    }
  }, [cartItems, router]);

  if (!router.isReady || cartItems.length === 0) return <Loading />;

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <CheckoutLayout
        firstColumn={
          <>
            <div className="mb-4 flex items-center justify-between">
              <HeadingText size="h2">Checkout</HeadingText>
              {isOnPaymentScreen ? (
                <Button
                  appearance="link"
                  size="default"
                  onClick={() => setIsOnPaymentScreen(false)}
                >
                  Back to details
                </Button>
              ) : (
                <Link href={`/${router.query.storeUrl}/cart`}>
                  <Button appearance="link" size="default">
                    Return to cart
                  </Button>
                </Link>
              )}
            </div>
            <div>
              {isOnPaymentScreen && clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                  <StripeCheckoutWidget />
                </Elements>
              ) : (
                <CheckoutFormFields
                  shippingInputs={shippingInputs}
                  setShippingInputs={setShippingInputs}
                  checkbox={checkbox}
                  setCheckbox={setCheckbox}
                  billingInputs={billingInputs}
                  setBillingInputs={setBillingInputs}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </>
        }
        secondColumn={
          <>
            <HeadingText size="h3">Order Summary</HeadingText>
            <Checkoutcard lineItems={cartItems} />
          </>
        }
      />
    </>
  );
}
