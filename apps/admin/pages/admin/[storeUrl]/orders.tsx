import AdminLayout from '../../../layouts/AdminLayout';
import Table from '../../../components/Table';
//import findOrders from '../../api/orders';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Order } from 'database';

// type Order = {
//   order_id: string,
//   order_number: string;
//   customer_name: string;
//   total_items: string;
//   order_total: string;
//   date_placed: string;
// };

function Orders() {
  const router = useRouter();

  const {
    data: orders,
    isLoading,
    isError,
  }: UseQueryResult<Record<string, string>> = useQuery({
    queryKey: ['order'],
    queryFn: () => fetch('/api/orders').then((res) => res.json()),
    enabled: !!router.isReady,
    initialData: {
      id: '',
      order_id: '', //order_id
      friendly_order_number: 'xxxxxxx', //friendly_order_number
      customer_first_name: '', //customer_first_name, customer_last_name
      order_details: '', //order_details. quantity
      total_order_cost: '', //total_order_cost
      created_at: '', //created_at
    },
  });

  const [formOrders, setFormOrders] = useState({});

  useEffect(() => {
    console.log('orders: ' + JSON.stringify(orders));
    setFormOrders(orders);
  }, [orders]);

  return (
    <>
      <p>Orders</p>
      <Table
        link={true}
        linkProperty="order_id"
        prependLink={`/admin/${router.query.storeUrl}/order`}
        tableColumnNames={[
          { id: 'friendly_order_number', name: 'Order Number' },
          { id: 'customer_first_name', name: 'Customer Name' },
          { id: 'order_details', name: 'Total Items' },
          { id: 'total_order_cost', name: 'Order Total' },
          { id: 'created_at', name: 'Date Placed' },
        ]}
        tableRows={[formOrders]}
        // tableColumnNames={[
        //   { id: 'order_number', name: 'Order Number' },
        //   { id: 'customer_name', name: 'Customer Name' },
        //   { id: 'total_items', name: 'Total Items' },
        //   { id: 'order_total', name: 'Order Total' },
        //   { id: 'date_placed', name: 'Date Placed' },
        // ]}
        // tableRows={[
        //   {
        //     id: '1',
        //     order_id: '10', //order_id
        //     order_number: '12345', //friendly_order_number
        //     customer_name: 'John Smith', //customer_first_name, customer_last_name
        //     total_items: '2', //order_details. quantity
        //     order_total: '£29', //total_order_cost
        //     date_placed: '17/03/23', //created_at
        //   },
        // ]}
      />
    </>
  );
}

export default function () {
  return (
    <AdminLayout title="orders">
      <Orders />
    </AdminLayout>
  );
}