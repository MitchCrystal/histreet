import { PropsWithChildren } from 'react';

export default function HeadingText({
  children,
  size,
}: PropsWithChildren<{ size: 'h1' | 'h2' | 'h3' | 'h4' }>) {
  return (
    <>
      {size === 'h1' && (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {children}
        </h1>
      )}
      {size === 'h2' && (
        <h2 className="mt-10 mb-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors dark:border-b-slate-700">
          {children}
        </h2>
      )}
      {size === 'h3' && (
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {children}
        </h3>
      )}
      {size === 'h4' && (
        <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
          {children}
        </h4>
      )}
    </>
  );
}
