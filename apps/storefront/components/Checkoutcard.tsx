import { ProductType } from '../pages/_app';
import HeadingText from './HeadingText';

export default function Checkoutcard({
  lineItems,
}: {
  lineItems: ProductType[];
}) {
  function totalPrice(ord: ProductType[]) {
    let total = ord.reduce((acc, ord) => {
      return acc + ord.product_price * (ord.quantityInCart || 0);
    }, 0);
    return total;
  }

  return (
    <div>
      <div className="grid grid-cols-11 items-center border-b border-gray-200 pb-2 gap-4">
        <div className="col-span-7">Item</div>
        <div className="col-span-2">Quantity</div>
        <div className="col-span-2 text-right">Total</div>
      </div>
      <div>
        {lineItems.map((order) => {
          return (
            <div
              className="grid grid-cols-11 items-center mt-2 gap-4"
              key={order.product_id}
            >
              <img
                src={order.product_images[0].src ?? '/missing_img.png'}
                alt={order.product_images[0].alt ?? 'missing image placeholder'}
                className="col-span-2 rounded-md w-12 h-12 overflow-hidden object-cover"
              />
              <p className="col-span-5 w-full truncate">{order.product_name}</p>
              <p className="col-span-2">x {order.quantityInCart}</p>
              <p className="col-span-2 text-right">
                {new Intl.NumberFormat('en-GB', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(order.product_price)}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-8">
        <HeadingText size="h4">Order Total</HeadingText>
        <HeadingText size="h4">
          {new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
          }).format(totalPrice(lineItems))}
        </HeadingText>
      </div>
    </div>
  );
}
