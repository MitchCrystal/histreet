import '../styles/globals.css';
import { createContext, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

export const CartContext: any = createContext([]);

export type ProductType = {
  product_name: string;
  SKU: string;
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

export const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const [cartItems, setCartItems] = useState<any>([]); //ProductType

  useEffect(() => {
    const localCart = localStorage.getItem('cartItems');
    setCartItems(localCart ? JSON.parse(localCart as string) : []);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) return;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleUpdateCart = useMemo(
    () => (product: ProductType, updateByQuantity: number) => {
      setCartItems((prev: any) => {
        return prev
          .map((item: ProductType) => {
            if (item.product_id === product.product_id) {
              return {
                ...item,
                quantityInCart: Number(updateByQuantity),
              };
            }
            return item;
          })
          .filter((item: any) => item.quantityInCart > 0);
      });
    },
    []
  );

  const handleAddToCart = useMemo(
    () => (product: ProductType, quantityToAdd: number) => {
      const itemAlreadyInCart = cartItems.find(
        (item: ProductType) => item.product_id === product.product_id
      );
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
    cartItems: ProductType[];
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
