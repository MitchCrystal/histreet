import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Button from '../../../../components/Button';
import Error from '../../../../components/Error';
import HeadingText from '../../../../components/HeadingText';
import ImageRow from '../../../../components/ImageRow';
import InputWithLabel from '../../../../components/InputWithLabel';
import MainLayout from '../../../../layouts/MainLayout';
import prisma from '../../../../utils/prisma';
import { CartContext } from '../../../_app';

type Product = {
  product_name: string;
  description: string;
  product_price: number;
  product_id: string;
  product_images: {
    src: string;
    alt: string;
    id: string;
  }[];
  inventory_qty: number;
  error?: string;
};

export async function getStaticPaths() {
  const stores = await prisma.store.findMany({
    select: {
      store_url: true,
      products: {
        select: {
          product_id: true,
          product_name_slug: true,
        },
      },
    },
  });

  const formattedArray: any[] = [];

  stores.forEach((store) => {
    store.products.forEach((_, i) => {
      formattedArray.push({
        params: {
          storeUrl: store.store_url,
          productId: store.products[i].product_id,
          nameSlug: store.products[i].product_name_slug,
        },
      });
    });
  });

  return {
    paths: formattedArray.map((item) => item),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: any) {
  try {
    const { productId } = context.params;

    if (!productId || productId === undefined) {
      throw new (Error as any)('Product not found');
    }
    const product = await prisma.product.findUnique({
      where: {
        product_id: String(productId),
      },
      select: {
        product_name: true,
        SKU: true,
        description: true,
        product_price: true,
        product_images: true,
        product_id: true,
        inventory_qty: true,
        is_active: true,
      },
    });

    if (product && product.is_active) {
      return {
        props: {
          product: {
            ...product,
            product_price: Number(product?.product_price),
          },
        },
      };
    } else {
      console.log(product);
      return {
        props: {
          product: [],
        },
        revalidate: 60,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        product: [],
      },
      revalidate: 60,
    };
  }
}

function ProductPage({ product }: { product: Product }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({ quantity: 1 });
  const [currentImage, setCurrentImage] = useState<any>('');

  const {
    cartItems,
    handleAddToCart,
  }: {
    cartItems: any;
    handleAddToCart: (product: any, quantity: number) => void;
    getCartTotal: any;
    getProductQuantityInCart: any;
  } = useContext(CartContext);

  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  useEffect(() => {
    if (
      !currentImage &&
      product &&
      product.product_images &&
      router.isReady &&
      product.product_id === router.query.productId
    ) {
      setCurrentImage(product.product_images[0]);
    }
  }, [product, currentImage, router.isReady, router.query.productId]);

  if (product && product?.error) return <p>Product not found</p>;

  const quantityInCart = cartItems.find(
    (item: any) => item.product_id === product.product_id
  )?.quantityInCart;

  return (
    <div>
      <Breadcrumbs
        pages={[
          {
            name: 'Products',
            href: `/${router.query.storeUrl}/products`,
            current: false,
          },
          {
            name: `${product.product_name}`,
            href: '#',
            current: true,
          },
        ]}
      />
      <div className="mt-6 md:grid sm:grid-cols-8 sm:gap-8 flex flex-col gap-4">
        <div className="col-span-3 flex flex-col gap-2">
          <div className="h-[500px] relative">
            <Image
              src={currentImage?.src ?? '/missing_img.png'}
              alt={currentImage?.alt ?? 'no image'}
              className="object-cover"
              fill
            />
          </div>
          {product.product_images && product.product_images?.length > 1 && (
            <ImageRow
              images={product.product_images}
              currentImage={currentImage}
              setCurrentImage={setCurrentImage}
            />
          )}
        </div>
        <div className="col-span-5 flex gap-4 flex-col p-4 sm:p-0">
          <HeadingText size="h3">{product.product_name}</HeadingText>
          <HeadingText size="h4">
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
            }).format(product.product_price)}
          </HeadingText>
          <p>{product.description}</p>
          <div className="flex flex-col gap-3">
            {product.inventory_qty > 0 && (
              <div className="w-16">
                <InputWithLabel
                  id="quantity"
                  label="Quantity"
                  state={formValues}
                  setState={setFormValues}
                  showLabel={true}
                  type="number"
                  direction="column"
                  min={1}
                />
              </div>
            )}
            <Button
              size="default"
              appearance="primary"
              additionalClasses="min-w-fit w-36"
              disabled={product.inventory_qty <= 0}
              onClick={() => {
                const productInCart = cartItems.find(
                  (item: any) => item.product_id === product.product_id
                );
                if (!productInCart) {
                  if (formValues.quantity <= product.inventory_qty) {
                    handleAddToCart(product, formValues.quantity);
                    toast.success(
                      `Added ${formValues.quantity} item${
                        formValues.quantity > 1 ? 's' : ''
                      } to cart`,
                      {
                        position: 'bottom-center',
                      }
                    );
                  } else {
                    toast.error('Not enough items in stock', {
                      position: 'bottom-center',
                    });
                  }
                } else {
                  if (
                    Number(productInCart.quantityInCart) +
                      Number(formValues.quantity) <=
                    product.inventory_qty
                  ) {
                    handleAddToCart(product, formValues.quantity);
                    toast.success(
                      `Added ${formValues.quantity} item${
                        formValues.quantity > 1 ? 's' : ''
                      } to cart`,
                      {
                        position: 'bottom-center',
                      }
                    );
                  } else {
                    toast.error('Not enough items in stock', {
                      position: 'bottom-center',
                    });
                  }
                }
                setFormValues({ quantity: 1 });
              }}
            >
              {product.inventory_qty === 0 ? 'Sold out' : 'Add to Cart'}
            </Button>
            {!!quantityInCart && <p>Quantity in cart: {quantityInCart}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ({ product }: { product: Product }) {
  return (
    <MainLayout title={`${product.product_name}`}>
      <ProductPage product={product} />
    </MainLayout>
  );
}
