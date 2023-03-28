import { useRouter, useSearchParams } from 'next/navigation';
//import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

type Product = {
  product_id: string;
  product_name: string;
  description: string;
  tags: String;
};

// const fetchProducts = async (url: string) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch posts');
//   }
//   return response.json();
// };

const search = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const router = useRouter();
  const encodedSearchQuery = encodeURI(searchQuery || '');

  const [storeProducts, setStoreProducts] = useState<Record<string, any>>({
    id: '',
    product_name: '',
    description: '',
    tags: '',
  });

  const { data: products }: UseQueryResult<Record<string, any>> = useQuery({
    queryKey: ['products'],
    queryFn: () =>
      fetch(`/api/search?q=${encodedSearchQuery}`).then((res) => res.json()),
    enabled: !!router.isReady,
    initialData: {},
  });

  useEffect(() => {
    if (!products.product_name) {
      return;
    }
    setStoreProducts({
      id: products.id,
      product_name: products.product_name,
      description: products.description,
      tags: products.tags,
    });
  }, [products]);

  // const { data, isLoading } = useSWR(
  //   `/api/search?q=${encodedSearchQuery}`,
  //   fetchProducts,
  //   { revalidateOnFocus: false }
  // );

  // if (!encodedSearchQuery) {
  //   router.push('/');
  // }
  // if (!products?.products) {
  //   return null;
  // }

  return (
    <>
      <span className="text-xl">
        Showing results for:{' '}
        <span className="font-semibold">{searchQuery}</span>
      </span>
      {products.products}
    </>
  );
};

export default search;
