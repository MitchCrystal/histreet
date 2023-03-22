import '../styles/globals.css';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

export const CartContext: any = createContext([]);

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
  quantityInCart?: number;
};

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const [cartItems, setCartItems] = useState<any>([]); //ProductType

  const handleUpdateCart = useMemo(
    () => (product: ProductType, updateByQuantity: number) => {
      setCartItems((prev: any) => [
        ...prev.filter(
          (item: ProductType) => item.product_id !== product.product_id
        ),
        {
          ...product,
          quantityInCart: Number(updateByQuantity),
        },
      ]);
    },
    [cartItems]
  );

  // need to set product value to X whatever is in the input

  const handleAddToCart = useMemo(
    () => (product: ProductType, quantityToAdd: number) => {
      const itemAlreadyInCart = cartItems.find(
        (item: ProductType) => item.product_id === product.product_id
      );
      console.log({ itemAlreadyInCart });
      if (itemAlreadyInCart) {
        setCartItems((prev: any) => [
          ...prev.filter(
            (item: ProductType) => item.product_id !== product.product_id
          ),
          {
            ...itemAlreadyInCart,
            quantityInCart:
              Number(itemAlreadyInCart.quantityInCart) + Number(quantityToAdd),
          },
        ]);
      } else {
        console.log('NOT IN CART');
        setCartItems((prev: any) => [
          ...prev,
          {
            ...product,
            quantityInCart: Number(quantityToAdd),
          },
        ]);
      }
    },
    [cartItems]
  );

  console.log({ cartItems });

  const totalItemsInCart = useMemo(
    () => () => {
      return cartItems.reduce(
        (acc: any, curr: any) => (acc += curr.quantityInCart || 0),
        0
      );
    },
    [cartItems]
  );

  const cartObj: {
    cartItems: { id: string; quantity: number }[];
    setCartItems: React.Dispatch<React.SetStateAction<any>>;
    handleAddToCart: (product: ProductType, quantityToAdd: number) => void;
    totalItemsInCart: () => void;
    handleUpdateCart: (product: ProductType, updateByQuantity: number) => void;
  } = {
    cartItems,
    setCartItems,
    handleAddToCart,
    totalItemsInCart,
    handleUpdateCart,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={cartObj}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </QueryClientProvider>
  );
}
