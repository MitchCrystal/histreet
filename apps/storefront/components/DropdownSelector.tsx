import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './SelectorLogic';

export default function DropdownSelector({
  options,
  selectId,
  label,
}: {
  options: { id: string; name: string }[];
  selectId: string;
  label: string;
}) {
  return (
    <div className="w-full">
      <label className="text-sm font-medium mb-6" htmlFor={selectId}>
        {label}
      </label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={options[0].name} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => {
            return (
              <SelectItem key={item.id} value={item.id} id={selectId}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
