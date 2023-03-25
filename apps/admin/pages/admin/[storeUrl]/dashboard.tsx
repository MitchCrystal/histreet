import AdminLayout from '../../../layouts/AdminLayout';
import getServerSideProps from '../../../utils/authorization'
export{getServerSideProps}

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
