import HeroImageBanner from '../../components/HeroImageBanner';
import MainLayout from '../../layouts/MainLayout';

const tempImage =
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80';

function StoreHome() {
  return (
    <>
      <HeroImageBanner
        heroImage={tempImage}
        alt="Image"
        heading="Welcome to our store"
        subheading="This is a subheading"
      />
    </>
  );
}

export default function () {
  return (
    <MainLayout title="Home">
      <StoreHome />
    </MainLayout>
  );
}
