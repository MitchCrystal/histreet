import AdminLayout from '../../../../layouts/AdminLayout';
import Heading from '../../../../components/Heading';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import Table from '../../../../components/Table';
import Address from '../../../../components/Address';
import Link from 'next/link';
import { getOrder } from '../../../api/order';
import { getAddress } from '../../../api/address';
import { getCustomer } from '../../../api/customer';
import { GetServerSideProps } from 'next';

function OrderDetail({ data, bill_address, ship_address, customer }: any) {
  // get order data (from server side props)
  const order = JSON.parse(data);
  const order_id = order.friendly_order_number;
  const { total_order_cost } = order;
  const { order_details } = order;
  const items_ordered = order_details.reduce((acc: any, item: any) => {
    return (acc = acc + item.quantity);
  }, 0);
  const customerData = JSON.parse(customer);

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
            <p className="mb-4">{customerData.customer_email}</p>
            <Heading title="Ship to" type="h4" />
            <Address
              firstName={ship_address.address_first_name}
              lastName={ship_address.address_last_name}
              firstLine={ship_address.address_line_1}
              secondLine={ship_address.address_line_2}
              city={ship_address.city}
              county={ship_address.county}
              country={ship_address.country}
              postcode={ship_address.postcode}
            />
            <br />
            <Heading title="Bill to" type="h4" />
            <Address
              firstName={bill_address.address_first_name}
              lastName={bill_address.address_last_name}
              firstLine={bill_address.address_line_1}
              secondLine={bill_address.address_line_2}
              city={bill_address.city}
              county={bill_address.county}
              country={bill_address.country}
              postcode={bill_address.postcode}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default function ({
  data,
  bill_address,
  ship_address,
  customer,
}: {
  data: any;
  bill_address: any;
  ship_address: any;
  customer: any;
}) {
  return (
    <AdminLayout title="Order Details">
      <OrderDetail
        data={data}
        bill_address={bill_address}
        ship_address={ship_address}
        customer={customer}
      />
    </AdminLayout>
  );
}

// get server side props
export const getServerSideProps: GetServerSideProps<{ data: any }> = async (
  context
) => {
  const { orderId } = context.query;
  const results = await getOrder(orderId);
  const data = JSON.stringify(results);
  const bill_address_id = JSON.parse(data).bill_address_id;
  const ship_address_id = JSON.parse(data).ship_address_id;
  const customer_id = JSON.parse(data).customer_id;
  const [bill_address, ship_address, customer] = await Promise.all([
    getAddress(bill_address_id),
    getAddress(ship_address_id),
    getCustomer(customer_id).then((res) => JSON.stringify(res)),
  ]);

  return {
    props: {
      data,
      bill_address,
      ship_address,
      customer,
    },
  };
};
