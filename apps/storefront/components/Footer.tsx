import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

type StoreformEmail = {
  id: string;
  storeName: string;
  supportEmail: string | null;
};

export default function Footer() {
  const router = useRouter();
  const storeUrl = router.query.storeUrl;

  const [storeformEmail, setStoreformEmail] = useState<Record<string, any>>({
    id: '',
    supportEmail: '',
  });

  const { data: storeEmail }: UseQueryResult<Record<string, any>> = useQuery({
    queryKey: ['storeEmail'],
    queryFn: () => fetch(`/api/footer/${storeUrl}`).then((res) => res.json()),
    enabled: !!router.isReady,
    initialData: {},
  });

  useEffect(() => {
    if (!storeEmail.storeName) {
      return;
    }
    setStoreformEmail({
      id: storeEmail.id,
      supportEmail: storeEmail.supportEmail ?? '',
    });
  }, [storeEmail]);
  return (
    <>
      <footer className="border-t border-gray-300 py-8 px-6 bg-gray-800 text-white">
        <div className="max-w-[1200px] m-auto">
          <p className="text-sm">
            {storeformEmail.supportEmail !== '' && (
              <span className="text-bold">Customer Support: </span>
            )}
            {storeformEmail.supportEmail}
          </p>
        </div>
      </footer>
    </>
  );
}
