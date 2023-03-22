import { Fragment, useState } from 'react';
import InputWithLabel from './InputWithLabel';

const columns = [
  { id: 'item', name: 'Item' },
  { id: 'name', name: 'Name' },
  { id: 'price', name: 'Price' },
  { id: 'quantity', name: 'Quantity' },
  { id: 'total', name: 'Total' },
];
const lineItems = [
  {
    id: 1,
    name: 'Product 1',
    nameSlug: 'product-1',
    price: 100,
    quantity: 1,
    image: 'https://picsum.photos/500/600',
  },
  {
    id: 2,
    name: 'Product 2',
    nameSlug: 'product-2',
    price: 29,
    quantity: 4,
    image: 'https://picsum.photos/500/700',
  },
];

export default function CartLineItemTable() {
  // @TODO Change this state to use global context
  // @TODO Update item's total price when quantity input changes
  const [quantityValues, setQuantityValues] = useState<Record<string, number>>({
    1: 1,
    2: 1,
  });

  return (
    <div className="grid grid-cols-5 gap-6 items-center rounded-md bg-gray-50 p-8">
      {columns.map((column) => (
        <p key={column.id} className="font-medium">
          {column.name}
        </p>
      ))}
      {lineItems.map((lineItem) => (
        <Fragment key={lineItem.id}>
          <img
            src={lineItem.image}
            alt={lineItem.name}
            className="w-20 h-20 object-fit rounded-md"
          />
          <p>{lineItem.name}</p>
          <p>£{lineItem.price}</p>
          {/* <p>{lineItem.quantity}</p> */}
          <InputWithLabel
            label="Quantity"
            name="quantity"
            id={String(lineItem.id)}
            type="number"
            state={quantityValues}
            showLabel={false}
            direction="row"
            setState={setQuantityValues}
            additionalClasses="w-16"
          />
          <p>£{lineItem.price * lineItem.quantity}</p>
        </Fragment>
      ))}
    </div>
  );
}
