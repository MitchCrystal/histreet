import { Fragment, useState } from 'react';
import { CartProduct } from '../pages/[storeUrl]/cart';
import { InputWithLabel } from './InputWithLabel';

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
];

export default function CartLineItemTable({
  products,
}: {
  products: CartProduct;
}) {
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
      {products.map((lineItem) => (
        <Fragment key={lineItem.product_id}>
          <img
            src={lineItem.product_images[0].image_url}
            alt={lineItem.product_images[0].image_alt}
            className="w-20 h-20 object-fit rounded-md"
          />
          <p>{lineItem.product_name}</p>
          <p>£{lineItem.product_price}</p>
          {/* <p>{lineItem.quantity}</p> */}
          <div className="w-16">
            <InputWithLabel
              label="Quantity"
              name="quantity"
              id={String(lineItem.product_id)}
              type="number"
              state={quantityValues}
              showLabel={false}
              direction="column"
              setState={setQuantityValues}
            />
          </div>
          {/* change to dynamic with state instead of 1. Same as in above ibput */}
          <p>£{lineItem.product_price * 1}</p>
        </Fragment>
      ))}
    </div>
  );
}
