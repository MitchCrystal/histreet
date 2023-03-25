import AdminLayout from '../../../layouts/AdminLayout';
import Table from '../../../components/Table';
import Heading from '../../../components/Heading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

function Orders() {
  const router = useRouter();
  const storeUrl = router.query.storeUrl;
  const { data: orders }: UseQueryResult<Record<string, any>[]> = useQuery({
    queryKey: ['order'],
    queryFn: () => fetch(`/api/orders/${storeUrl}`).then((res) => res.json()),
    enabled: !!router.isReady,
    initialData: [],
  });

  const [formOrders, setFormOrders] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    const formattedOrder = orders.map((order) => {
      return {
        ...order,
        order_total: new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'GBP',
        }).format(Number(order.order_total)),
      };
    });
    setFormOrders(formattedOrder);
  }, [orders]);

  return (
    <>
      <Heading title="Orders" type="h1"></Heading>
      <Table
        link={true}
        linkProperty="order_id"
        prependLink={`/admin/${router.query.storeUrl}/order`}
        tableColumnNames={[
          { id: 'order_number', name: 'Order Number' },
          { id: 'customer_name', name: 'Customer Name' },
          { id: 'total_items', name: 'Total Items' },
          { id: 'order_total', name: 'Order Total' },
          { id: 'date_placed', name: 'Date Placed' },
        ]}
        tableRows={formOrders}
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
