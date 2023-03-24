import prisma from '../../../utils/prisma';
import HeadingText from '../../../components/HeadingText';
import Address from '../../../components/Address';
import Button from '../../../components/Button';
import { useRouter } from 'next/router';
import Checkoutcard from '../../../components/Checkoutcard';
import { GetServerSidePropsContext } from 'next';

export default function OrderConfirmation({ order }: { order: any }) {
  const router = useRouter();
  console.log(order)
  const orders = [
    {
      id: 1,
      image: 'https://picsum.photos/200/300',
      name: 'tshirt',
      price: 111,
      quantity: 1,
    },
    {
      id: 2,
      image: 'https://picsum.photos/200/300',
      name: 'shorts',
      price: 333,
      quantity: 1,
    },
    {
      id: 3,
      image: 'https://picsum.photos/200/300',
      name: 'pants',
      price: 2323,
      quantity: 1,
    },
  ];
  function onClick() {
    router.push(`/${router.query.storeUrl}`);
  }

  return (
    <div className="flex flex-col justify-start gap-8 items-center w-full h-screen m-auto">
      <div className="flex justify-center items-center w-4/5 p-11 border-slate-200 border mt-8">
        <HeadingText size="h2">Thank you for your order!</HeadingText>
      </div>
      <div className="flex justify-start items-center flex-col w-4/5 h-full p-11 border-slate-200 border">
        <div>
          <HeadingText size="h3">Confirmation</HeadingText>
        </div>
        <div>
          <HeadingText size="h4">Order #21092</HeadingText>
        </div>
        <div className="flex flex-row justify-between items-center border-slate-200 border w-full h-full">
          <div className="flex flex-col justify-center items-center border-slate-200 border w-full h-full">
            <div className="flex p-10">example@example.com</div>
            <div className="flex flex-row gap-10">
              <div>
                {' '}
                Ship to:
                <Address
                  firstName="John"
                  lastName="Smith"
                  firstLine="123 Smith Street"
                  secondLine="Flat 89"
                  city="Bristol"
                  county="Somerset"
                  postcode="S000 000"
                  country="United Kingdom"
                />
              </div>
              <div>
                {' '}
                Bill to:
                <Address
                  firstName="John"
                  lastName="Smith"
                  firstLine="123 Smith Street"
                  secondLine="Flat 89"
                  city="Bristol"
                  county="Somerset"
                  postcode="S000 000"
                  country="United Kingdom"
                />
              </div>
            </div>
          </div>
          <div className="flex placement-content-center border-slate-200 border w-[100%] h-[100%]">
            <Checkoutcard values={orders} />
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
      friendly_order_number:true
    },
  });
  if (!order) {
    return { props: null };
  }
  {
    const data = JSON.stringify(order);
    console.log(data);
    return { props: { data } };
  }
}
