import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import Button from '../../../../components/Button';
import HeadingText from '../../../../components/HeadingText';
import ImageRow from '../../../../components/ImageRow';
import { InputWithLabel } from '../../../../components/InputWithLabel';
import MainLayout from '../../../../layouts/MainLayout';
import { CartContext } from '../../../_app';

type Product = {
  id: string;
  images: {
    id: string;
    image: string;
  }[];
  name: string;
  price: number;
  description: string;
  inventory: number;
};

const product = {
  id: '1',
  images: [
    {
      id: '1',
      image: 'https://picsum.photos/500/700',
    },
    {
      id: '2',
      image: 'https://picsum.photos/500/800',
    },
    {
      id: '3',
      image: 'https://picsum.photos/500/600',
    },
    {
      id: '4',
      image: 'https://picsum.photos/500/900',
    },
  ],
  name: 'Product 1',
  price: 100,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  ',
  inventory: 1,
};

function ProductPage() {
  // @TODO: Make page dynamic with DB
  const router = useRouter();
  const [formValues, setFormValues] = useState({ quantity: 1 });
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  const { cartItems, setCartItems }: { cartItems: any; setCartItems: any } =
    useContext(CartContext);

  console.log(cartItems);

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
            name: `${product.name}`,
            href: '#',
            current: true,
          },
        ]}
      />
      <div className="md:grid sm:grid-cols-8 sm:gap-8 flex flex-col gap-4">
        <div className="col-span-3 flex flex-col gap-2">
          <img
            src={currentImage.image}
            alt={currentImage.id}
            className="object-cover h-[500px]"
          />
          <ImageRow
            images={product.images}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />
        </div>
        <div className="col-span-5 flex gap-4 flex-col p-4 sm:p-0">
          <HeadingText size="h3">{product.name}</HeadingText>
          <HeadingText size="h4">£{product.price}</HeadingText>
          <p>{product.description}</p>
          <div className="flex flex-col gap-3">
            {product.inventory > 0 && (
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
              disabled={product.inventory <= 0}
              onClick={() => {
                setCartItems(
                  (
                    currentCart: Product & { id: string; quantity: number }[]
                  ) => {
                    const filteredCart = currentCart.filter(
                      (item) => item.id !== product.id && item.quantity > 0
                    );
                    const itemInCart = currentCart.find(
                      (item) => item.id === product.id
                    );
                    return [
                      ...filteredCart,
                      {
                        id: product.id,
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
              }}
            >
              {product.inventory === 0 ? 'Sold out' : 'Add to Cart'}
            </Button>
            {!!cartItems.find(
              (item: Product) => item.id === router.query.productId
            )?.quantity && (
              <p>
                Quantity in cart:{' '}
                {
                  cartItems.find(
                    (item: Product) => item.id === router.query.productId
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
