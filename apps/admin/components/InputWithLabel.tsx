import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

export function InputWithLabel({
  label,
  id,
  type,
  showLabel,
  state,
  setState,
  direction,
  ...delegated
}: {
  label: string;
  id: string;
  type: string;
  showLabel: boolean;
  state: Record<string, string>;
  setState: React.Dispatch<React.SetStateAction<any>>;
  direction: 'row' | 'column';
  [x: string]: any;
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div
        className={`flex w-full ${
          direction === 'row'
            ? 'flex-row'
            : direction === 'column'
            ? 'flex-col'
            : ''
        }`}
      >
        <div>
          <Label className={`${showLabel ? '' : 'sr-only'}`} htmlFor={id}>
            {label}
          </Label>
        </div>
        <input
          id={id}
          className="m-1 flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
          value={state[id]}
          type={type}
          onChange={(e) => setState({ ...state, [id]: e.target.value })}
          {...delegated}
        />
      </div>
    </div>
  );
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 m-1
      ${className}`}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;
