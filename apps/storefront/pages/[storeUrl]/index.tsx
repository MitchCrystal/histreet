import HeroImageBanner from '../../components/HeroImageBanner';
import MainLayout from '../../layouts/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

type Props = {
  storeDetails: {
    id: string;
    name: string;
    heroUrl: string;
    heroAlt: string;
    logoUrl: string;
    description: string;
  };
  isLoading: boolean;
  isError: boolean;
};

function StoreHome({ storeDetails, isLoading, isError }: Props) {
  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <HeroImageBanner
          heroImage={isLoading ? '' : storeDetails.heroUrl}
          alt={isLoading ? '' : storeDetails.heroAlt}
          heading={isLoading ? '' : storeDetails.name}
          subheading={isLoading ? '' : storeDetails.description}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default function () {
  const router = useRouter();
  const {
    data: storeDetails,
    isLoading,
    isError,
  } = useQuery(
    ['products'],
    () => fetch('/api/' + router.query.storeUrl).then((res) => res.json()),
    {
      enabled: !!router.query.storeUrl,
    }
  );

  return (
    <MainLayout title={`${isLoading || isError ? 'Home' : storeDetails.name}`}>
      <StoreHome
        storeDetails={storeDetails}
        isLoading={isLoading}
        isError={isError}
      />
    </MainLayout>
  );
}
