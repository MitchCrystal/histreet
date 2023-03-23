import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Product = {
  product_id: string;
  product_images: {
    id: string;
    src: string;
    alt: string;
  }[];
  product_name: string;
  product_price: number;
  product_name_slug: string;
  inventory_qty: number;
};

export default function ProductGridItem({ product }: { product: Product }) {
  const router = useRouter();

  const [currentImage, setCurrentImage] = useState(product.product_images[0]);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={`/${router.query.storeUrl}/product/${product.product_id}/${product.product_name_slug}`}
      >
        <div className="relative overflow-hidden md:min-h-[300px] max-h-[300px] flex flex-col items-center justify-center">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="object-cover"
            onMouseEnter={() => {
              if (!product.product_images[1]) return;
              setCurrentImage(product.product_images[1]);
            }}
            onMouseLeave={() => setCurrentImage(product.product_images[0])}
          />
        </div>
      </Link>
      <div>
        <Link
          href={`/${router.query.storeUrl}/product/${product.product_id}/${product.product_name_slug}`}
        >
          <p className="text-lg">{product.product_name}</p>
        </Link>
        <div className="flex items-center gap-2">
          <p>
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
            }).format(product.product_price)}
          </p>
          {product.inventory_qty <= 0 && (
            <p className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
              Sold out
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
