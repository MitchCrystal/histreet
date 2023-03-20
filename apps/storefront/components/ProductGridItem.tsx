import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Product = {
  id: string;
  firstImage: string;
  secondImage: string;
  name: string;
  price: number;
  nameSlug: string;
};

export default function ProductGridItem({ product }: { product: Product }) {
  const router = useRouter();

  const [currentImage, setCurrentImage] = useState(product.firstImage);

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/${router.query.storeUrl}/product/${product.id}/${product.nameSlug}`}
      >
        <div className="overflow-hidden max-h-[300px]">
          <img
            src={currentImage}
            alt={product.name}
            className="object-cover"
            onMouseEnter={() => setCurrentImage(product.secondImage)}
            onMouseLeave={() => setCurrentImage(product.firstImage)}
          />
        </div>
      </Link>
      <div>
        <Link
          href={`/${router.query.storeUrl}/product/${product.id}/${product.nameSlug}`}
        >
          <p className="text-lg">{product.name}</p>
        </Link>
        <p>£{product.price}</p>
      </div>
    </div>
  );
}
