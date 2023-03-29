import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Table from '../../../components/Table';
import AdminLayout from '../../../layouts/AdminLayout';

type Product = {
  product_name: string;
  store_id?: Record<string, any>;
  inventory_qty: string;
  product_price: number;
  SKU: string;
};

const Search = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const router = useRouter();
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const storeUrl = router.query.storeUrl;

  const [storeProducts, setStoreProducts] = useState<Record<string, any>[]>([]);

  console.log('store url in search: ' + JSON.stringify(storeUrl));
  const { data: products }: UseQueryResult<Record<string, any>[]> = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      fetch(`/api/search/${storeUrl}?q=${encodedSearchQuery}`).then((res) =>
        res.json()
      ),
    enabled: !!router.isReady,
    initialData: [],
  });

  useEffect(() => {
    setStoreProducts(products);
  }, [products]);

  return (
    <>
      <span className="text-xl">
        Showing results for:{' '}
        <span className="font-semibold">{searchQuery}</span>
      </span>
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
        tableRows={storeProducts}
      />
    </>
  );
};

export default function () {
  return (
    <AdminLayout title="search">
      <Search />
    </AdminLayout>
  );
}
