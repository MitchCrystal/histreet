import AdminLayout from '../../../../layouts/AdminLayout';
import Heading from '../../../../components/Heading';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import Table from '../../../../components/Table';
import Address from '../../../../components/Address';
import Link from 'next/link';

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

function OrderDetail() {
  return (
    <>
      <Heading title="Order #738272" type="h1" />
      <div className="flex justify-end">
        <Link href="/admin/storeurl/order/">
          <Button size="default" appearance="primary">
            Back
          </Button>
        </Link>
      </div>
      <div className="flex">
        <div className="w-full">
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
        <div className="ml-20">
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
