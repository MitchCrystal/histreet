import '../styles/globals.css';
import { createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

export const CartContext: any = createContext([]);

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const [cartItems, setCartItems] = useState([]);
  const cartObj: {
    cartItems: any[];
    setCartItems: React.Dispatch<React.SetStateAction<any>>;
  } = { cartItems, setCartItems };

  return (
    <QueryClientProvider client={queryClient}>
      <CartContext.Provider value={cartObj}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </QueryClientProvider>
  );
}
