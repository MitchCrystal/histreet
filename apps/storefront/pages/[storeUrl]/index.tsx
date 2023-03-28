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
  }
  };

function StoreHome({storeDetails}:Props) {

  return (
    <>
      <HeroImageBanner
        heroImage={storeDetails.heroUrl}
        alt={storeDetails.heroAlt}
        heading={storeDetails.name}
        subheading={storeDetails.description}
      />
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

if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <MainLayout title={storeDetails.name}>
      <StoreHome storeDetails={storeDetails} />
    </MainLayout>
  );
}
