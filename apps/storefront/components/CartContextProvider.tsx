import { useRouter } from 'next/router';
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ProductType = {
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

export const CartContext: any = createContext([]);

export default function CartContextProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any>([]); //ProductType

  useEffect(() => {
    if (!router.isReady) return;
    const localCart = localStorage.getItem(
      'cartItems_' + router.query.storeUrl
    );
    setCartItems(localCart ? JSON.parse(localCart as string) : []);
  }, [router.isReady, router.query.storeUrl]);

  useEffect(() => {
    if (cartItems.length === 0) return;
    localStorage.setItem(
      'cartItems_' + router.query.storeUrl,
      JSON.stringify(cartItems)
    );
  }, [cartItems, router.query.storeUrl]);

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
    <CartContext.Provider value={cartObj}>{children}</CartContext.Provider>
  );
}
