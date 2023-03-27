import prisma from '../../../utils/prisma';
import HeadingText from '../../../components/HeadingText';
import Address from '../../../components/Address';
import { useRouter } from 'next/router';
import Checkoutcard from '../../../components/Checkoutcard';
import type { GetServerSidePropsContext } from 'next';
import Error from '../../../components/Error';
import { useEffect, useState } from 'react';
import CheckoutLayout from '../../../layouts/CheckoutLayout';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';

type AddressData = {
  address_id: string;
  address_first_name: string;
  address_last_name: string;
  address_line_1: string;
  address_line_2?: string;
  county?: string;
  city: string;
  country: string;
  postcode: string;
  customer_id: string;
};

type Details = {
  id: string;
  price: number;
  qty: number;
  name: string;
}[];

type Customer = {
  customer_email: string;
  phone_number: string;
};

type Product = {
  product_images: {
    id: string;
    src: string;
    alt: string;
  }[];
  product_name: string;
  product_id: string;
};

type OrderData = {
  bill_address: AddressData;
  ship_address: AddressData;
  friendly_order_number: number;
  order_details: Details;
  customer: Customer;
  products: Product[];
};

export default function OrderConfirmation({ order }: { order: OrderData }) {
  const router = useRouter();

  const [lineItems, setLineItems] = useState<any[]>([]);

  useEffect(() => {
    if (!order || !router.query.orderId) return;
    setLineItems(() => {
      return order.order_details.map((item) => {
        const product: Product | undefined = order.products.find(
          (product) => product.product_id === item.id
        );
        return {
          product_id: item.id,
          product_name: item.name,
          product_images: product?.product_images,
          product_price: item.price,
          quantityInCart: item.qty,
          product_name_slug: product?.product_name,
        };
      });
    });
  }, []);

  if (!order || !router.query.orderId) return <Error />;

  return (
    <>
      <Head>
        <title>{`Order Confirmation | #${order.friendly_order_number}`}</title>
      </Head>
      <CheckoutLayout
        firstColumn={
          <div className="flex flex-col justify-start gap-2 max-w-[600px] m-auto">
            <div className="flex items-start justify-start gap-4 flex-col md:flex-row md:items-center">
              <CheckCircleIcon className="text-green-600 w-12 max-w-12  mt-2 text-sm" />
              <div>
                <h2 className="text-gray-800">
                  Order #{order.friendly_order_number}
                </h2>
                <HeadingText size="h2">
                  Thanks for your order, {order.bill_address.address_first_name}
                  !
                </HeadingText>
                <h3 className="text-lg">
                  Your order has been successfuly processed.
                </h3>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-4 lg:gap-12 items-start justify-start mt-8 border p-4 rounded-md">
              <div>
                <h3 className="text-lg font-medium">Contact details</h3>
                <p>{order.customer.customer_email}</p>
                {!!order.customer.phone_number && (
                  <p>{order.customer.phone_number}</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium">Shipping address</h3>
                <Address
                  firstName={order.ship_address.address_first_name}
                  lastName={order.ship_address.address_last_name}
                  firstLine={order.ship_address.address_line_1}
                  secondLine={order.ship_address.address_line_2 ?? ''}
                  city={order.ship_address.city}
                  county={order.ship_address.county ?? ''}
                  postcode={order.ship_address.postcode}
                  country={order.ship_address.country}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">Billing address</h3>
                <Address
                  firstName={order.bill_address.address_first_name}
                  lastName={order.bill_address.address_last_name}
                  firstLine={order.bill_address.address_line_1}
                  secondLine={order.bill_address.address_line_2 ?? ''}
                  city={order.bill_address.city}
                  county={order.bill_address.county ?? ''}
                  postcode={order.bill_address.postcode}
                  country={order.bill_address.country}
                />
              </div>
            </div>
          </div>
        }
        secondColumn={<Checkoutcard lineItems={lineItems} />}
      />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const orderId = context.query.orderId;
  const order = await prisma.order.findUnique({
    where: {
      order_id: String(orderId),
    },
    select: {
      bill_address: true,
      ship_address: true,
      friendly_order_number: true,
      order_details: true,
      products: {
        select: {
          product_id: true,
          product_images: true,
          product_name: true,
          product_name_slug: true,
        },
      },
      customer: {
        select: {
          customer_email: true,
          phone_number: true,
        },
      },
    },
  });
  if (!order) {
    return { props: { order: false } };
  }
  {
    return { props: { order } };
  }
}
