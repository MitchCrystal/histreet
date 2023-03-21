import AdminLayout from '../../../../layouts/AdminLayout';
import Heading from '../../../../components/Heading';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import Table from '../../../../components/Table';
import Address from '../../../../components/Address';
import Link from 'next/link';
import { getOrder } from '../../../api/order';
import { GetServerSideProps } from 'next';

function OrderDetail({ data }: any) {
  // get order data (from server side props)
  const order = JSON.parse(data);
  console.log(order);
  const order_id = order.friendly_order_number;
  const { total_order_cost } = order;
  const { order_details } = order;
  const items_ordered = order_details.reduce((acc: any, item: any) => {
    return (acc = acc + item.quantity);
  }, 0);

  //@TODO : set tableColumn with order data
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
  ];

  // render page
  return (
    <>
      <div className="w-1/2 md:w-5/6 lg:w-full">
        <Heading title={`Order #${order_id}`} type="h1" />
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
            <Heading title={`Items Ordered (${items_ordered})`} type="h2" />
            <Table
              tableColumnNames={tableColumnNames}
              tableRows={tableRows}
            ></Table>
          </Card>
          <Card>
            <div className="flex justify-between">
              <Heading title="Total Order" type="h3" />
              <div className="mr-28">
                <Heading title={`£${total_order_cost}`} type="h3" />
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-10 mb-10 w-1/2 md:w-5/6 lg:w-full xl:ml-20 xl:mt-0">
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
            <br />
            <Heading title="Bill to" type="h4" />
            <Address
              firstName="john"
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
    </>
  );
}

export default function ({ data }: { data: any }) {
  return (
    <AdminLayout title="Order Details">
      <OrderDetail data={data} />
    </AdminLayout>
  );
}

// get server side props

export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  try {
    const { orderId } = context.query;
    const results = await getOrder(orderId);
    const data = await JSON.stringify(results);
    const bill_address_id = JSON.parse(data).bill_address_id;
    const ship_address_id = JSON.parse(data).ship_address_id;
    // const bill_address = await (
    //   await fetch(`/api/address?id=${bill_address_id}`)
    // ).json();
    // const ship_address = await (
    //   await fetch(`/api/address?id=${ship_address_id}`)
    // ).json();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: null,
      },
    };
  }
};
