import { PropsWithChildren } from 'react';

export default function Card({ children }: PropsWithChildren) {
  return (
    <>
      <div className="w-auto p-6 bg-white shadow-lg">{children}</div>
    </>
  );
}
