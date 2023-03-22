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
    image_id: string;
    image_url: string;
    image_alt: string;
  }[];
  inventory_qty: number;
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

  const { cartItems, setCartItems }: { cartItems: any; setCartItems: any } =
    useContext(CartContext);

  useEffect(() => {
    if (!currentImage && product) {
      setCurrentImage(product.product_images[0]);
    }
  }, [product]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

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
            src={currentImage.image_url}
            alt={currentImage.image_alt}
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
                product.inventory_qty <=
                  cartItems.find(
                    (item: { id: string; quantity: number }) =>
                      item.id === router.query.productId
                  )?.quantity
              }
              onClick={() => {
                setIsButtonDisabled(true);
                if (
                  product.inventory_qty <
                  formValues.quantity +
                    (cartItems.find(
                      (item: { id: string; quantity: number }) =>
                        item.id === router.query.productId
                    )?.quantity || 0)
                ) {
                  toast.error(
                    `Error: Only ${
                      product.inventory_qty -
                      (cartItems.find(
                        (item: { id: string; quantity: number }) =>
                          item.id === router.query.productId
                      )?.quantity || 0)
                    } left in stock`,
                    {
                      position: 'bottom-center',
                    }
                  );
                  setFormValues({
                    quantity:
                      product.inventory_qty -
                      (cartItems.find(
                        (item: { id: string; quantity: number }) =>
                          item.id === router.query.productId
                      )?.quantity || 0),
                  });
                  setTimeout(() => {
                    setIsButtonDisabled(false);
                  }, 1000);
                  return;
                }
                setCartItems(
                  (
                    currentCart: Product & { id: string; quantity: number }[]
                  ) => {
                    const filteredCart = currentCart.filter(
                      (item) =>
                        item.id !== product.product_id && item.quantity > 0
                    );
                    const itemInCart = currentCart.find(
                      (item) => item.id === product.product_id
                    );
                    return [
                      ...filteredCart,
                      {
                        id: product.product_id,
                        quantity:
                          Number(itemInCart?.quantity ?? 0) +
                            Number(formValues.quantity) <=
                          0
                            ? 0
                            : Number(itemInCart?.quantity ?? 0) +
                              Number(formValues.quantity),
                      },
                    ];
                  }
                );
                setFormValues({ quantity: 1 });
                toast.success('Item added to cart', {
                  position: 'bottom-center',
                });
                setTimeout(() => {
                  setIsButtonDisabled(false);
                }, 500);
              }}
            >
              {product.inventory_qty === 0 ||
              product.inventory_qty <=
                cartItems.find(
                  (item: { id: string; quantity: number }) =>
                    item.id === router.query.productId
                )?.quantity
                ? 'Sold out'
                : 'Add to Cart'}
            </Button>
            {!!cartItems.find(
              (item: { id: string; quantity: number }) =>
                item.id === router.query.productId
            )?.quantity && (
              <p>
                Quantity in cart:{' '}
                {
                  cartItems.find(
                    (item: { id: string; quantity: number }) =>
                      item.id === router.query.productId
                  ).quantity
                }
              </p>
            )}
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
