import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';
type Props = {
  heroImage: string;
  alt: string;
  heading: string;
  subheading: string;
};

export default function HeroImageBanner({
  heroImage,
  alt,
  heading,
  subheading,
}: Props) {
  const router = useRouter();

  return (
    <>
      <div className="md:h-[600px] md:overflow-hidden md:relative m-auto">
        <img src={heroImage} alt={alt} className="object-cover" />
        <div className="md:absolute md:top-[50%] w-full md:translate-y-[-50%] text-center flex flex-col">
          <div className="bg-gray-100 md:bg-white md:rounded-md rounded-b-md p-12 w-full md:w-fit m-auto md:shadow flex items-center justify-center flex-col gap-2">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              {heading}
            </h1>
            <p>{subheading}</p>
            <Link href={`/${router.query.storeUrl}/products`}>
              <Button
                size="default"
                appearance="primary"
                additionalClasses="mt-2"
              >
                Shop now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
