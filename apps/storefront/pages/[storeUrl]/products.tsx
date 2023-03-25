import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Error from '../../components/Error';
import HeadingText from '../../components/HeadingText';
import Loading from '../../components/Loading';
import ProductGridItem from '../../components/ProductGridItem';
import MainLayout from '../../layouts/MainLayout';

type ProductType = {
  product_name: string;
  product_price: number;
  product_id: string;
  product_name_slug: string;
  product_images: {
    id: string;
    src: string;
    alt: string;
  }[];
  inventory_qty: number;
};

function Products() {
  const router = useRouter();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(
    ['products'],
    () =>
      fetch('/api/products/' + router.query.storeUrl).then((res) => res.json()),
    {
      enabled: !!router.query.storeUrl,
    }
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
console.log(products)
  return (
    <>
      <HeadingText size="h3">Products</HeadingText>
      <p className="mt-2 mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.{' '}
      </p>
      {products.length === 0 ? (
        <p className="mt-6">No products listed</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {products.map((product: ProductType) => (
            <ProductGridItem key={product.product_id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default function () {
  return (
    <MainLayout title="Products">
      <Products />
    </MainLayout>
  );
}
