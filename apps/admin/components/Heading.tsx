type Props = {
  title: string;
  type: string;
}

export default function Heading({ title, type }: Props) {
  return (
    <>
      {type === 'h1' && (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </h1>
      )}
      {type === 'h2' && (
        <h2 className="mt-10 mb-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors dark:border-b-slate-700">
          {title}
        </h2>
      )}
      {type === 'h3' && (
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {title}
        </h3>
      )}
      {type === 'h4' && (
        <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
          {title}
        </h4>
      )}
    </>
  );
}
