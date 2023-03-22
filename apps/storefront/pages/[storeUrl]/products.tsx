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
    image_url: string;
    image_alt: string;
  }[];
};

function Products() {
  const router = useRouter();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(['products'], () =>
    fetch('/api/products/' + router.query.storeUrl).then((res) => res.json())
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <HeadingText size="h3">Products</HeadingText>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {products.map((product: ProductType) => (
          <ProductGridItem key={product.product_id} product={product} />
        ))}
      </div>
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
