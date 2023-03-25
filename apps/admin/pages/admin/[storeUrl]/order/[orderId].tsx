import AdminLayout from '../../../../layouts/AdminLayout';
import Heading from '../../../../components/Heading';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import Table from '../../../../components/Table';
import Address from '../../../../components/Address';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useQuery } from '@tanstack/react-query';

function OrderDetail({ order }: any) {
  const router = useRouter();

  // // get bill_address
  const { data: bill_address } = useQuery({
    queryKey: ['bill_address'],
    queryFn: () =>
      fetch(`/api/address/${order.bill_address_id}`).then((res) => res.json()),
    enabled: !!order && !order.hasOwnProperty('error'),
  });

  // // get ship_address
  const { data: ship_address } = useQuery({
    queryKey: ['ship_address'],
    queryFn: () =>
      fetch(`/api/address/${order.ship_address_id}`).then((res) => res.json()),
    enabled: !!order && !order.hasOwnProperty('error'),
  });

  // get customer
  const { data: customer } = useQuery({
    queryKey: ['customer'],
    queryFn: () =>
      fetch(`/api/customer/${order.customer_id}`).then((res) => res.json()),
    enabled: !!order && !order.hasOwnProperty('error'),
  });

  const order_details = order.order_details;
  const items_ordered = order.order_details.reduce((acc: number, item: any) => {
    return (acc = acc + item.quantity);
  }, 0);

  // get products
  const products_id = order_details?.map((item: any) => item.productId);
  const [productDetails, setProductDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (products_id && productDetails.length === 0) {
      setIsLoading(true);
      const queries = products_id.map((id: string) => {
        return {
          querykey: ['id', id],
          queryFn: () => fetch(`/api/product/${id}`).then((res) => res.json()),
        };
      });
      const promises = queries.map((query: any) => query.queryFn());
      Promise.all(promises).then((results) => {
        setProductDetails(results);
        setIsLoading(false);
      });
    }
  }, [products_id, productDetails]);
  if (!order || order.hasOwnProperty('error'))
    return (
      <div>
        {' '}
        <p>No order matched</p>
        <div className="flex justify-end">
          <Button
            size="default"
            appearance="primary"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
      </div>
    );
  const products_price = order_details?.map((item: any) => item.price);
  const products_quantity = order_details?.map((item: any) => item.quantity);
  const products_name = productDetails.map((item) => item.product_name);
  const products_SKU = productDetails.map((item) => item.SKU);

  const tableColumnNames = [
    { id: 'Product_name', name: 'Product name' },
    { id: 'SKU', name: 'SKU' },
    { id: 'Price', name: 'Price' },
    { id: 'Quantity', name: 'Quantity' },
    { id: 'Total', name: 'Total' },
  ];
  const tableRows = products_id.map((id: string, index: number) => {
    const price = products_price[index];
    const quantity = products_quantity[index];
    const name = products_name[index];
    const sku = products_SKU[index];
    return {
      id: id,
      Product_name: name,
      SKU: sku,
      Price: new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(price),
      Quantity: String(quantity),
      Total: new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(price * quantity),
    };
  });

  if (!bill_address || !ship_address) return <p>fetching address...</p>;
  if (!customer) return <p>fetching email...</p>;
  if (isLoading) return <p>fetching product details...</p>;

  // render page
  return (
    <>
      <div className="w-1/2 md:w-5/6 lg:w-full mb-4">
        <div className="flex justify-end">
          <Button
            size="default"
            appearance="primary"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </div>
        <Heading title={`Order #${order.friendly_order_number}`} type="h1" />
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
                <Heading
                  title={`${new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                  }).format(order.total_order_cost)}`}
                  type="h3"
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-10 mb-10 w-1/2 md:w-5/6 lg:w-full xl:ml-20 xl:mt-0">
          <Card>
            <Heading title="Customer" type="h4" />
            <p className="mb-4">{customer.customer_email}</p>
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

export default function ({ order }: any) {
  return (
    <AdminLayout title="Order Details">
      <OrderDetail order={order} />
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps<{ order: any }> = async (
  context
) => {
  const { orderId } = context.query;
  const order = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/order/${orderId}`
  ).then((res) => res.json());

  if (order.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      order,
    },
  };
};
