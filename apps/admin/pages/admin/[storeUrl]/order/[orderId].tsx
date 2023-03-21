import AdminLayout from '../../../../layouts/AdminLayout';

function OrderDetail() {
  return (
    <>
      <p>Order detail</p>
    </>
  );
}

export default function () {
  return (
    <AdminLayout title="Order Details">
      <OrderDetail />
    </AdminLayout>
  );
}
