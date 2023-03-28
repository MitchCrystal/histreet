import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import HeadingText from '../../components/HeadingText';
import ProductGridItem from '../../components/ProductGridItem';
import MainLayout from '../../layouts/MainLayout';
import prisma from '../../utils/prisma';

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

export async function getServerSideProps(context: any) {
  try {
    const { storeUrl } = context.params;

    if (!storeUrl) {
      return {
        props: {
          products: [],
        },
      };
    }

    const store = await prisma.store.findUnique({
      where: {
        store_url: String(storeUrl),
      },
      select: {
        store_id: true,
        store_name: true
      },
    });

    const storefront = await prisma.storefront.findUnique({
      where: {
        store_id: String(store?.store_id),
      },
      select: {
        store_description: true,
      },
    });

    const products = await prisma.product.findMany({
      where: {
        store_id: store?.store_id,
        is_active: true,
      },
      select: {
        product_name: true,
        SKU: true,
        product_price: true,
        product_images: true,
        product_id: true,
        product_name_slug: true,
        inventory_qty: true,
      },
    });

    return {
      props: {
        products: products.map((item) => ({
          ...item,
          product_price: Number(item.product_price),
        })),
        store: store?.store_name,
        store_desc: storefront?.store_description
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
        store: ''
      },
    };
  }
}

function Products({ products, store_desc }: { products?: ProductType[], store_desc:string }) {
  return (
    <>
      <HeadingText size="h3">Products</HeadingText>
      <p className="mt-2 mb-6">
        {store_desc}
      </p>
      {!products || products.length === 0 ? (
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

export default function ({ products, store, store_desc }: { products?: ProductType[], store:string, store_desc:string }) {
  return (
    <MainLayout title={store}>
      <Products products={products} store_desc={store_desc} />
    </MainLayout>
  );
}
