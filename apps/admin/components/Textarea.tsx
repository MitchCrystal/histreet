import * as React from 'react';
import { Label } from './Label';

type Props = {
  label: string;
  id: string;
  state: Record<string, any>;
  setState: React.Dispatch<React.SetStateAction<any>>;
  direction: 'row' | 'column';
  [x: string]: any;
};

export default function Textarea({
  label,
  id,
  state,
  setState,
  direction,
  ...delegated
}: Props) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <div
        className={`flex w-full ${
          direction === 'row'
            ? 'flex-row items-center justify-center'
            : direction === 'column'
            ? 'flex-col'
            : ''
        }`}
      >
        <Label htmlFor={id} className="w-48">
          {label}
        </Label>
        <textarea
          className="flex h-30 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-md  placeholder:text-black focus:outline-none focus:ring-2focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id={id}
          value={state[id]}
          onChange={(e) => setState({ ...state, [id]: e.target.value })}
          {...delegated}
        />
      </div>
    </div>
  );
}
