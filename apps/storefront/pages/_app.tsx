import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import CartContextProvider from '../components/CartContextProvider';

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
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </QueryClientProvider>
  );
}
