import Logo from '../components/Logo';

export default function CheckoutLayout({
  firstColumn,
  secondColumn,
}: {
  firstColumn: React.ReactNode;
  secondColumn: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center w-full">
      <div className="flex flex-col place-content-center border-b border-gray-200 w-full">
        <div className="flex place-content-center text-white p-6">
          <Logo logoSrc={''} storeName="Demo Store" />
        </div>
      </div>
      <div className="bg-gray-100 min-h-screen w-full">
        <div className="grid grid-cols-5 h-full">
          <div className="bg-gray-50 lg:col-span-3 col-span-5 min-h-screen">
            <div className="md:py-12 md:px-24 py-8 px-8">{firstColumn}</div>
          </div>
          <div className="bg-gray-100 border-gray-200 border-l py-12 px-12 hidden lg:block lg:col-span-2">
            <div className="flex flex-col gap-4">{secondColumn}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
