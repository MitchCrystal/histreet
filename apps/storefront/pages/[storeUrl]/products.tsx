import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
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

export async function getStaticPaths() {
  const stores = await prisma.store.findMany({
    select: {
      store_url: true,
    },
  });

  return {
    paths: stores.map((store) => ({
      params: {
        storeUrl: store.store_url,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
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
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
      revalidate: 10,
    };
  }
}

function Products({ products }: { products?: ProductType[] }) {
  useEffect(() => {
    return () => toast.dismiss();
  }, []);
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
        mollit anim id est laborum.
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

export default function ({ products }: { products?: ProductType[] }) {
  return (
    <MainLayout title="Products">
      <Products products={products} />
    </MainLayout>
  );
}
