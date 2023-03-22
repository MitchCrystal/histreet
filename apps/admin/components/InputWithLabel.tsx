import * as React from 'react';
import { Label } from './Label';

export default function InputWithLabel({
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
    <div className={`grid w-full max-w-sm items-center gap-1.5 `}>
      <div
        className={`flex w-full ${
          direction === 'row'
            ? 'flex-row items-center justify-center'
            : direction === 'column'
            ? 'flex-col items-start'
            : ''
        }`}
      >
        <Label
          className={`${showLabel ? direction === 'row' && 'w-48' : 'sr-only'}`}
          htmlFor={id}
        >
          {label}
        </Label>
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
