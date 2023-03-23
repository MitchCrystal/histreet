import AdminLayout from '../../../layouts/AdminLayout';
import Table from '../../../components/Table';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Heading from '../../../components/Heading';

function Orders() {
  const router = useRouter();
  const storeUrl = router.query.storeUrl;
  const {
    data: orders,
    isLoading,
    isError,
  }: UseQueryResult<Record<string, any>[]> = useQuery({
    queryKey: ['order'],
    queryFn: () =>
      //need to change store_id dynamic todo
      fetch(`/api/orders?store_id=store_1`).then((res) => res.json()),
    enabled: !!router.isReady,
    initialData: [],
  });

  const [formOrders, setFormOrders] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setFormOrders(orders);
  }, [orders]);

  return (
    <>
      <Heading title={'Orders'} type="h2" />
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
