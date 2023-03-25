import prisma from '../../../utils/prisma';
import HeadingText from '../../../components/HeadingText';
import Address from '../../../components/Address';
import Button from '../../../components/Button';
import { useRouter } from 'next/router';
import Checkoutcard from '../../../components/Checkoutcard';
import { GetServerSidePropsContext } from 'next';
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
  name: string;
  image?: string;
  price: number;
  quantity: number;
}[];

type Customer = {
  customer_email: string; 
  customer_first_name:string;
}

type OrderData = {
  bill_address: AddressData;
  ship_address: AddressData;
  friendly_order_number: number;
  order_details: Details;
  customer: Customer;
};

export default function OrderConfirmation({ order }: { order: OrderData }) {
  const router = useRouter();
  function onClick() {
    router.push(`/${router.query.storeUrl}`);
  }

  return (
    <div className="flex flex-col justify-start gap-8 items-center w-full h-screen m-auto">
      <div className="flex justify-center items-center w-4/5 p-11 border-slate-200 border mt-8 shadow">
        <HeadingText size="h2">Thank you for your order {order.customer.customer_first_name}!</HeadingText>
      </div>
      <div className="flex justify-start items-center flex-col w-4/5 p-11 border-slate-200 border shadow-md">
        <div>
          <HeadingText size="h3">Confirmation</HeadingText>
        </div>
        <div>
          <HeadingText size="h4">
            Order #{order.friendly_order_number}
          </HeadingText>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center w-full h-full">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex p-10">{order.customer.customer_email}</div>
            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                {' '}
                Ship to:
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
                {' '}
                Bill to:
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
          <div className="flex placement-content-center w-[100%] h-[100%]">
            <Checkoutcard values={order.order_details} />
          </div>
        </div>
      </div>
      <div className="flex mb-10">
        <Button size="lg" appearance="primary" type="button" onClick={onClick}>
          Visit Store
        </Button>
      </div>
    </div>
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
      customer: {
        select: {
          customer_email: true,
          customer_first_name:true
        },
      },
    },
  });
  if (!order) {
    return { props: null };
  }
  {
    return { props: { order } };
  }
}
