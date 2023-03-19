type Props = {
  label: string;
  id: string;
  state: Record<string,string>; 
  setState: React.Dispatch<React.SetStateAction<Record<string,string>>>;
  [x: string]: any;
};

export default function Textarea({
  label,
  id,
  state,
  setState,
  ...delegated
}: Props) {
  return (
    <div className="Textarea">
      <label htmlFor={id}>{label}</label>
      <textarea
        className=
          'flex h-30 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-md  placeholder:text-black focus:outline-none focus:ring-2focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        id={id}
        value={state[id]}
        onChange={(e) => setState({ ...state, [id]: e.target.value })}
        {...delegated}
      />
    </div>
  );
}
