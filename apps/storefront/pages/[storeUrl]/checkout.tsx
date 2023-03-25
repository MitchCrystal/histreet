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
    if (cartItems.length === 0) {
      router.back();
    }
  }, [cartItems]);

  if (cartItems.length === 0) return <Loading />;

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="min-h-screen bg-slate-800 flex flex-col items-center w-full">
        <div className="flex flex-col place-content-center border-b border-gray-200 w-full">
          <div className="flex place-content-center text-white p-6">
            <Logo logoSrc={''} storeName="Demo Store" />
          </div>
        </div>
        <div className="bg-gray-100 min-h-screen w-full">
          <div className="grid grid-cols-5 h-full">
            <div className="bg-gray-50 lg:col-span-3 col-span-5 min-h-screen">
              <div className="md:py-12 md:px-24 py-8 px-8">
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
            </div>
            <div className="bg-gray-100 border-gray-200 border-l py-12 px-12 hidden lg:block lg:col-span-2">
              <div className="flex flex-col gap-4">
                <HeadingText size="h3">Order Summary</HeadingText>
                <Checkoutcard lineItems={cartItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
