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
export { getServerSideProps };

function Dashboard() {
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

  if (isError) return <p>Error</p>;
  return (
    <div className="flex flex-col object-contain justify-center items-center -ml-8 md:ml-0">
      <Heading title="Dashboard" type="h1" />
      <Heading title={propHeading} type="h4" />
      <div className="flex flex-col object-contain m-5">
        <div className="grid grid-row-4 justify-center items-center gap-3 pb-8 mt-10 mb-3 xl:flex md:place-items-center md:w-full overflow-hidden">
          <div className="flex flex-col grid-rows-2 rounded-md shadow  h-48 w-60 md:h-64 md:w-96 overflow-hidden">
            <div className="flex h-24 w-full bg-yellow-400 justify-center items-center text-center text-2xl">
              Weekly Revenue
            </div>
            <div className="h-48 grid grid-cols-2 place-items-center place-content-center border border-gray-200 border-t-0">
              <div className="h-20 w-20 bg-purple-500 rounded-full p-0 flex justify-center items-center">
                <CurrencyPoundIcon width={50} height={50} color="white" />
              </div>
              <div className="h-20 w-20 grid grid-rows-2 place-items-center place-content-center">
                <div className="font-bold text-lg">Total</div>
                <div className="text-lg">
                  {orders ? (
                    new Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: 'GBP',
                    }).format(orders)
                  ) : (
                    <LoadingSpinner />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col grid-rows-2 rounded-md shadow h-48 w-60 md:h-64 md:w-96 overflow-hidden">
            <div className="flex h-24 w-full bg-yellow-400 justify-center items-center text-center text-2xl">
              Weekly Orders
            </div>
            <div className="h-48 grid grid-cols-2 place-items-center">
              <div className="h-20 w-20 bg-orange-600 rounded-full p-0 flex justify-center items-center">
                <ShoppingCartIcon width={50} height={50} color="white" />
              </div>
              <div className="h-20 w-20 grid grid-rows-2 place-items-center place-content-center">
                <div className="font-bold text-lg">Total</div>
                <div className="text-lg">
                  {totalOrders ? totalOrders : <LoadingSpinner />}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col object-contain grid-rows-2 rounded-md shadow h-48 w-60 md:h-64 md:w-96 overflow-hidden">
            <div className="flex h-24 w-full bg-yellow-400 justify-center items-center text-center text-2xl">
              Weekly Customers
            </div>
            <div className="h-48 grid grid-cols-2 place-items-center">
              <div className="flex h-20 w-20 bg-cyan-400 rounded-full p-0 justify-center items-center">
                <UserIcon width={50} height={50} color="white" />
              </div>
              <div className="h-20 w-20 grid grid-rows-2 place-items-center place-content-center">
                <div className="font-bold text-lg">Total</div>
                <div className="text-lg">
                  {totalCustomers ? totalCustomers : <LoadingSpinner />}
                </div>
              </div>
            </div>
          </div>
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
