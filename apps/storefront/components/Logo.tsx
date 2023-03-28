import Image from 'next/image';
type Props = {
  logoSrc: string;
  storeName: string;
};

export default function Logo({ logoSrc, storeName }: Props) {
  return (
    <div className="px-2">
      {logoSrc ? (
        <img src={logoSrc} alt={storeName+' logo'} className="h-[100px] object-contain" />
      ) : (
        <h2 className="text-3xl font-medium">{storeName}</h2>
      )}
    </div>
  );
}
