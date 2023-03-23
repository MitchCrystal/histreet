import AdminLayout from '../../../layouts/AdminLayout';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Heading from '../../../components/Heading';

function Products() {
  const router = useRouter();
  //const storeUrl = router.query.storeUrl;
  const {
    data: products,
    isLoading,
    isError,
  }: UseQueryResult<Record<string, any>[]> = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      //store_id need to be dynamic todo
      fetch(`/api/products?store_id=store_1`).then((res) => res.json()),
    enabled: !!router.isReady,
    initialData: [],
  });

  const [formProducts, setFormProducts] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    setFormProducts(products);
  }, [products]);

  return (
    <>
      <div className="w-1/2 md:w-5/6 lg:w-full">
        <div className="flex justify-end">
          <Button
            size="default"
            appearance="primary"
            //onClick={() =>()}
          >
            Add Product
          </Button>
        </div>
        <Heading title={'Products'} type="h2" />
      </div>
      <Table
        link={true}
        linkProperty="product_id"
        prependLink={`/admin/${router.query.storeUrl}/product`}
        tableColumnNames={[
          { id: 'product_name', name: 'Product Name' },
          { id: 'SKU', name: 'SKU' },
          { id: 'inventory_qty', name: 'Inventory' },
          { id: 'product_price', name: 'Price' },
        ]}
        tableRows={formProducts}
      />
    </>
  );
}

export default function () {
  return (
    <AdminLayout title="Products">
      <Products />
    </AdminLayout>
  );
}
