import AdminLayout from '../../../layouts/AdminLayout';
import Table from '../../../components/Table';
//import findOrders from '../../api/orders';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

function Orders() {
  const router = useRouter();
  return (
    <>
      <p>Orders</p>
      <Table
        link={true}
        linkProperty="order_id"
        prependLink={`/admin/${router.query.storeUrl}/order`}
        tableColumnNames={[
          { id: 'order_number', name: 'Order Number' },
          //{ id: 'customer_name', name: 'Customer Name' },
          //{ id: 'total_items', name: 'Total Items' },
          { id: 'order_total', name: 'Order Total' },
          { id: 'date_placed', name: 'Date Placed' },
        ]}
        tableRows={[
          {
            id: '1',
            order_id: '10',
            order_number: '12345', //friendly_order_number
            //customer_name: 'John Smith',
            //total_items: '2',
            order_total: '£29', //total_order_cost
            date_placed: '17/03/23', //created_at
          },
        ]}
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
