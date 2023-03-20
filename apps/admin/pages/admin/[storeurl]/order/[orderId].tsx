import AdminLayout from '../../../../layouts/AdminLayout';
import Heading from '../../../../components/Heading';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import Table from '../../../../components/Table';
import Address from '../../../../components/Address';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const tableColumnNames = [
  { id: 'Product_name', name: 'Product name' },
  { id: 'SKU', name: 'SKU' },
  { id: 'Price', name: 'Price' },
  { id: 'Quantity', name: 'Quantity' },
  { id: 'Total', name: 'Total' },
];

const tableRows = [
  {
    id: '1',
    Product_name: 'Black T-shirt',
    SKU: '12345',
    Price: '30',
    Quantity: '3',
    Total: '90',
  },
  {
    id: '2',
    Product_name: 'White Dress',
    SKU: '6789',
    Price: '75',
    Quantity: '1',
    Total: '75',
  },
  {
    id: '3',
    Product_name: 'Vans old school',
    SKU: '42490',
    Price: '85',
    Quantity: '2',
    Total: '170',
  },
  {
    id: '5',
    Product_name: 'white shirt',
    SKU: '124155521',
    Price: '40',
    Quantity: '1',
    Total: '40',
  },
  {
    id: '4',
    Product_name: 'cross bag',
    SKU: '90152',
    Price: '30',
    Quantity: '1',
    Total: '30',
  },
];

// fetch an 'order' data with order_id
// order.order-id -> go to first heading title
// order.order_details.length -> go to second heading title
// order.order.details -> JSON.parse -> go to  tableRows -> pass order.order_details.price, order.order_details.quantity, order.total_order_cost
// also, after JSON.parse, fetch a 'product' data with order.order_details.productId -> pass product.SKU, product.product_name to tableRows
// fetch a 'customer' data with order.customer_id -> render customer.customer_email
// -> fetch 'addresses' data with order.customer_id -> customer.addresses -> get the whole address data and pass it to Address components
function OrderDetail() {
  const router = useRouter();
  const orderId = router.query.orderId;
  function getOrder() {
    const { isLoading, error, data } = useQuery({
      queryKey: ['order'],
      queryFn: () => fetch('/api/hello').then((res) => res.json()),
    });
    return data;
  }
  console.log(getOrder());

  return (
    <>
      <div className="w-1/2 md:w-5/6 lg:w-full">
        <Heading title="Order #738272" type="h1" />
        <div className="flex justify-end">
          <Link href="/admin/storeurl/order/">
            <Button size="default" appearance="primary">
              Back
            </Button>
          </Link>
        </div>
      </div>
      <div className="xl:flex">
        <div className="w-1/2 md:w-5/6 lg:w-full">
          <Card>
            <Heading title="Items Ordered(3)" type="h2" />
            <Table
              tableColumnNames={tableColumnNames}
              tableRows={tableRows}
            ></Table>
          </Card>
          <Card>
            <div className="flex justify-between">
              <Heading title="Total Order" type="h3" />
              <div className="mr-28">
                <Heading title="£405" type="h3" />
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-10 w-1/2 md:w-5/6 lg:w-full xl:ml-20 xl:mt-0">
          <Card>
            <Heading title="Customer" type="h4" />
            <p className="mb-4">examle@example.com</p>
            <Heading title="Ship to" type="h4" />
            <Address
              firstName="sohyun"
              lastName="lim"
              firstLine="52 DBhouse"
              secondLine="Flat 1"
              city="London"
              county="Borough"
              country="UK"
              postcode="sw84xs"
            />
            <Heading title="Bill to" type="h4" />
            <Address
              firstName="John"
              lastName="Smitn"
              firstLine="123 Smith Street"
              secondLine="Flat 89"
              city="Bristol"
              county="Somerset"
              country="UK"
              postcode="nw13qr"
            />
          </Card>
        </div>
      </div>
      <p></p>
    </>
  );
}

export default function () {
  return (
    <AdminLayout title="Order Details">
      <OrderDetail />
    </AdminLayout>
  );
}
