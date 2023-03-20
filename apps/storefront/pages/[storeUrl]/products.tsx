import HeadingText from '../../components/HeadingText';
import ProductGridItem from '../../components/ProductGridItem';
import MainLayout from '../../layouts/MainLayout';

const products = [
  {
    id: '1',
    firstImage: 'https://picsum.photos/500/600',
    secondImage: 'https://picsum.photos/500/700',
    name: 'Product 1',
    price: 100,
    nameSlug: 'product-1',
  },
];

function Products() {
  return (
    <>
      <HeadingText size="h3">Products</HeadingText>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <ProductGridItem key={product.id} product={product} />
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
