import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../layouts/AdminLayout';
import getServerSideProps from '../../../utils/authorization';
import {CurrencyPoundIcon, ShoppingCartIcon, UserIcon} from '@heroicons/react/24/outline';
export { getServerSideProps };

function Dashboard() {
  const router = useRouter();
  const { storeUrl } = router.query;
  const { data: stats, isError, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () =>
      fetch(`/api/dashboard/${storeUrl}`).then((res) => res.json()),
    enabled: !!router.isReady && !!storeUrl,
  });
  const userName = stats?.user.user_first_name;
  const propHeading = `Welcome back ${userName}`;
  const orders = stats?.orders.reduce((acc:number,curr:any) => {
    return acc + Number(curr.total_order_cost);
  },0).toFixed(0);
  const totalCustomers = stats?.customers.length
  const totalOrders = stats?.orders.length
  
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>
  return (
    <div>
      <Heading title="Dashboard" type="h1" />
      <Heading title={propHeading} type="h4" />
      <div className="grid grid-row-3 justify-center items-center gap-3 mt-10 md:grid-cols-3 md:place-items-center md:w-full">
        <div className="border grid-rows-2 rounded-md shadow-xl h-60 w-60 md:h-96 md:w-96">
          <div className="flex h-24 w-full border bg-yellow-400 shadow-xl justify-center items-center text-center text-4xl">
            Revenue
          </div>
          <div className="h-48 grid grid-cols-2 place-items-center place-content-center">
            <div className="h-20 w-20 bg-purple-500 rounded-full p-0 flex justify-center items-center">
              <CurrencyPoundIcon width={50} height={50} color='white'/>
            </div>
            <div className="h-20 w-20 grid grid-rows-2 place-items-center place-content-center">
              <div>Total</div>
              <div>{new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(orders)}</div>
            </div>
          </div>
        </div>
        <div className="border grid-rows-2 rounded-md shadow-xl h-60 w-60 md:h-96 md:w-96">
          <div className="flex h-24 w-full border bg-yellow-400 shadow-xl justify-center items-center text-center text-4xl">
            Sales
          </div>
          <div className="h-48 grid grid-cols-2 place-items-center">
            <div className="h-20 w-20 bg-orange-600 rounded-full p-0 flex justify-center items-center">
              <ShoppingCartIcon width={50} height={50} color='white'/>
            </div>
            <div className="h-20 w-20 grid grid-rows-2 place-items-center place-content-center">
              <div>Total</div>
              <div>{totalOrders}</div>
            </div>
          </div>
        </div>
        <div className="border grid-rows-2 rounded-md shadow-xl h-60 w-60 md:h-96 md:w-96">
          <div className="flex h-24 w-full border bg-yellow-400 shadow-xl justify-center items-center text-center text-4xl">
            Customers
          </div>
          <div className="h-48 grid grid-cols-2 place-items-center">
            <div className="flex h-20 w-20 bg-cyan-400 rounded-full p-0 justify-center items-center">
              <UserIcon width={50} height={50} color='white'/>
            </div>
            <div className="h-20 w-20 grid grid-rows-2 place-items-center place-content-center">
              <div className='text-'>Total</div>
              <div>{totalCustomers}</div>
            </div>
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
