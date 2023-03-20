import { PropsWithChildren, MouseEventHandler } from 'react';

const defaultStyle =
  'scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800';

const buttonVariants = {
  default:
    'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900',
  primary: 'bg-blue-700 text-white hover:bg-blue-800 dark:hover:bg-blue-600',
  destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
  outline:
    'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
  subtle:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
  ghost:
    'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
  link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent',
};

const buttonSizes = {
  default: 'h-10 py-2 px-4',
  sm: 'h-9 px-2 rounded-md',
  lg: 'h-11 px-8 rounded-md',
};

export default function Button({
  size,
  appearance,
  type = 'button',
  onClick,
  children,
  additionalClasses,
  ...delegated
}: PropsWithChildren<{
  size: 'default' | 'sm' | 'lg';
  appearance:
    | 'default'
    | 'primary'
    | 'destructive'
    | 'outline'
    | 'subtle'
    | 'ghost'
    | 'link';
  type?: 'button' | 'submit' | 'reset';
  additionalClasses?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [x: string]: any;
}>) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${defaultStyle} ${buttonVariants[appearance]} ${buttonSizes[size]} ${additionalClasses}`}
      {...delegated}
    >
      {children}
    </button>
  );
}
