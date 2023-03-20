import Button from '../../components/Button';
import CartLineItemTable from '../../components/CartLineItemTable';
import HeadingText from '../../components/HeadingText';
import MainLayout from '../../layouts/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Cart() {
  const router = useRouter();
  return (
    <>
      <HeadingText size="h3">Cart</HeadingText>
      <div className="md:grid sm:grid-cols-9 mt-8 flex flex-col gap-8 w-full">
        <div className="col-span-6">
          <div className="overflow-auto">
            <div className="min-w-[500px] ">
              <CartLineItemTable />
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
              {/* @TODO Change to dynamic value */}
              <HeadingText size="h4">£100</HeadingText>
            </div>
            {/* @TODO Change to dynamic value */}
            <p>Total items: 2</p>
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
