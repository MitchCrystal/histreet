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
}: {
  options: { id: string; name: string }[];
}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={options[0].name} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => {
          return <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>;
        })}
      </SelectContent>
    </Select>
  );
}
