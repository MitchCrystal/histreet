import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';
import HeadingText from './HeadingText';

export default function EmptyCart() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 rounded-md flex items-center justify-center p-12 flex-col gap-6">
      <HeadingText size="h4">Your cart is empty</HeadingText>
      <Link
        href={`${
          router.pathname === '/[storeUrl]/products'
            ? '/' + router.query.storeUrl
            : '/' + router.query.storeUrl + '/products'
        }`}
      >
        <Button size="default" appearance="primary">
          Start shopping
        </Button>
      </Link>
    </div>
  );
}
