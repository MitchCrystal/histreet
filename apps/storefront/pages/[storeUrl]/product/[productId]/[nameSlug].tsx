import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Button from '../../../../components/Button';
import Error from '../../../../components/Error';
import HeadingText from '../../../../components/HeadingText';
import ImageRow from '../../../../components/ImageRow';
import InputWithLabel from '../../../../components/InputWithLabel';
import Loading from '../../../../components/Loading';
import MainLayout from '../../../../layouts/MainLayout';
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

function ProductPage() {
  const router = useRouter();
  const {
    data: product,
    isLoading,
    isError,
  }: UseQueryResult<Product, unknown> = useQuery({
    queryKey: ['product'],
    queryFn: () =>
      fetch(`/api/product/${router.query.productId}`).then((res) => res.json()),
    enabled: !!router.isReady,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [formValues, setFormValues] = useState({ quantity: 1 });
  const [currentImage, setCurrentImage] = useState<any>('');

  const {
    cartItems,
    handleAddToCart,
    getCartTotal,
    getProductQuantityInCart,
  }: {
    cartItems: any;
    handleAddToCart: (product: any, quantity: number) => void;
    getCartTotal: any;
    getProductQuantityInCart: any;
  } = useContext(CartContext);

  useEffect(() => {
    if (!currentImage && product) {
      product.product_images && setCurrentImage(product.product_images[0]);
    }
  }, [product, currentImage]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (product.error) return <p>Product not found</p>;

  //@TODO Fix for if no product found, redirect to 404

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
      <div className="md:grid sm:grid-cols-8 sm:gap-8 flex flex-col gap-4">
        <div className="col-span-3 flex flex-col gap-2">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="object-cover h-[500px]"
          />
          <ImageRow
            images={product.product_images}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
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
              disabled={
                product.inventory_qty <= 0 ||
                product.inventory_qty <= quantityInCart
              }
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
              {product.inventory_qty === 0
                ? 'Sold out'
                : product.inventory_qty <= quantityInCart
                ? 'All available items in cart'
                : 'Add to Cart'}
            </Button>
            {!!quantityInCart && <p>Quantity in cart: {quantityInCart}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function () {
  return (
    <MainLayout title="Product Page">
      <ProductPage />
    </MainLayout>
  );
}
