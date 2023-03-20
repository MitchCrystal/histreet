type Props = {
  id: string;
  label: string;
  state: Record<string, boolean>;
  setState: React.Dispatch<React.SetStateAction<any>>;
};

export default function Checkbox({ id, label, state, setState }: Props) {
  const bool = state.val;
  return (
    <div className="flex flex-row gap-2 justify-center items-center p-1">
      <input
        id={id}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
        checked={bool}
        type="checkbox"
        onChange={(e) => setState({ ...state, [id]: e.target.checked })}
      />
      <label className="text-sm text-gray-900">{label}</label>
    </div>
  );
}
