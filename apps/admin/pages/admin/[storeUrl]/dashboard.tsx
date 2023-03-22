import AdminLayout from '../../../layouts/AdminLayout';

function Dashboard() {
  return (
    <>
      <p>Dashboard</p>
    </>
  );
}

export default function () {
  return (
    <AdminLayout title="Dashboard">
      <Dashboard />
    </AdminLayout>
  );
}
