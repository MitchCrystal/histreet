import MainLayout from '../../../../layouts/MainLayout';

function ProductPage() {
  return (
    <>
      <p>Product detail</p>
    </>
  );
}

export default function () {
  return (
    <MainLayout title="Product Page">
      <ProductPage />
    </MainLayout>
  );
}
