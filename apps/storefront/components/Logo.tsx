import Image from 'next/image';

export default function Logo({
  logoSrc,
  storeName,
}: {
  logoSrc: string;
  storeName: string;
}) {
  return (
    <div className="px-2">
      {logoSrc ? (
        <Image src={logoSrc} alt={storeName} width={100} />
      ) : (
        <h2 className="text-2xl font-medium">{storeName}</h2>
      )}
    </div>
  );
}
