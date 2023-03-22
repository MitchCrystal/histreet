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
    <div className="flex flex-col gap-2">
      <Link
        href={`/${router.query.storeUrl}/product/${product.product_id}/${product.product_name_slug}`}
      >
        <div className="relative overflow-hidden min-h-[300px] max-h-[300px] flex flex-col items-center justify-center">
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
        {product.inventory_qty <= 0 && (
          <div className="bg-gray-100 p-1 w-fit text-xs uppercase relative top-[-290px]">
            Sold out
          </div>
        )}
      </Link>
      <div>
        <Link
          href={`/${router.query.storeUrl}/product/${product.product_id}/${product.product_name_slug}`}
        >
          <p className="text-lg">{product.product_name}</p>
        </Link>
        <p>
          {new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
          }).format(product.product_price)}
        </p>
      </div>
    </div>
  );
}
