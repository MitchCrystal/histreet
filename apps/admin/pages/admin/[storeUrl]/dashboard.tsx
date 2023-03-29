import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../layouts/AdminLayout';
import getServerSideProps from '../../../utils/authorization';
import {
  CurrencyPoundIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import LineChart from '../../../components/LineChart';
import LoadingSpinner from '../../../components/Loading';
import DashboardCard from '../../../components/DashboardCard';
export { getServerSideProps };




const labels = ['Week1', 'Week2', 'Week3', 'Week4'];
const optionsSalesCustomer = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'March Total Orders and Customers/Time',
      font: {
        size: 20,
      },
    },
  },
};
const dataSalesCustomer = {
  labels,
  datasets: [
    {
      label: 'Total Orders',
      data: [0, 1, 4, 4],
      borderColor: '#ea580c',
      backgroundColor: '#ea580c',
    },
    {
      label: 'Total Customers',
      data: [0, 3, 2, 1],
      borderColor: '#22d3ee',
      backgroundColor: '#22d3ee',
    },
  ],
};
const optionsRevenue = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'March Total Revenue/Time',
      font: {
        size: 20,
      },
    },
  },
};
const dataRevenue = {
  labels,
  datasets: [
    {
      label: 'Total Revenue',
      data: [10001, 1292872, 3765526, 4946864],
      borderColor: '#a855f7',
      backgroundColor: '#a855f7',
    },
  ],
};
function Dashboard() {
  const router = useRouter();
  const { storeUrl } = router.query;
  const { data: stats, isError } = useQuery({
    queryKey: ['stats'],
    queryFn: () =>
      fetch(`/api/dashboard/${storeUrl}`).then((res) => res.json()),
    enabled: !!router.isReady && !!storeUrl,
  });
  const userName = stats?.user.user_first_name ?? '';
  const propHeading = `Welcome back ${userName}`;
  const orders = stats?.orders
    .reduce((acc: number, curr: any) => {
      return acc + Number(curr.total_order_cost);
    }, 0)
    .toFixed(0);
  const totalCustomers = stats?.customers.length;
  const totalOrders = stats?.orders.length;
  const iconRevenue = (
    <CurrencyPoundIcon width={50} height={50} color="white" />
  );
  const iconOrders = <ShoppingCartIcon width={50} height={50} color="white" />;
  const iconCustomer = <UserIcon width={50} height={50} color="white" />;
  const customerProps =
    totalCustomers !== undefined ? totalCustomers : <LoadingSpinner />;
  const orderProps =
    totalOrders !== undefined ? totalOrders : <LoadingSpinner />;
  const revenueProps =
    orders !== undefined ? (
      new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(orders)
    ) : (
      <LoadingSpinner />
    );

  if (isError) return <p>Error</p>;
  return (
    <div className="flex flex-col object-contain justify-center items-center -ml-8 md:ml-0">
      <Heading title="Dashboard" type="h1" />
      <Heading title={propHeading} type="h4" />
      <div className="flex flex-col object-contain m-5">
        <div className="grid grid-row-4 justify-center items-center gap-3 pb-8 mt-10 mb-3 xl:flex md:place-items-center md:w-full overflow-hidden">
          <DashboardCard
            title="Weekly Revenue"
            icon={iconRevenue}
            props={revenueProps}
            colour='purple'
          />
          <DashboardCard
            title="Weekly Orders"
            icon={iconOrders}
            props={orderProps}
            colour='orange'
          />
          <DashboardCard
            title="Weekly Customers"
            icon={iconCustomer}
            props={customerProps}
            colour='cyan'

          />
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-1 md:flex-row md:gap-5 shadow py-5 px-5 overflow-hidden rounded-md">
          <div className="sm:overflow-scroll lg:w-full">
            <LineChart options={optionsRevenue} data={dataRevenue} />
          </div>
          <div className="sm:overflow-scroll lg:w-full">
            <LineChart
              options={optionsSalesCustomer}
              data={dataSalesCustomer}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function () {
  return (
    <AdminLayout title="Dashboard">
      <Dashboard />
    </AdminLayout>
  );
}
