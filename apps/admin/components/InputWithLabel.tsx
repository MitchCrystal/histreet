import { Input } from './Input';
import { Label } from './Label';

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
  setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  direction: 'row' | 'column';
  [x: string]: any;
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div
        className={`flex ${
          direction === 'row'
            ? 'flex-row'
            : direction === 'column'
            ? 'flex-col'
            : ''
        }`}
      >
        {showLabel && <Label htmlFor={id}>{label}</Label>}
        <Input
          type={type}
          id={id}
          value={state[id]}
          onChange={(e) => setState({ ...state, [id]: e.target.value })}
          {...delegated}
        />
      </div>
    </div>
  );
}
