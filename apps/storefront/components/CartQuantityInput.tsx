import { useContext } from 'react';
import { ProductType } from '../pages/_app';
import { CartContext } from './CartContextProvider';
type Props = {
  lineItem: ProductType;
  additionalClassNames?: string;
};

export default function CartQuantityInput({
  lineItem,
  additionalClassNames,
}: Props) {
  const {
    cartItems,
    handleUpdateCart,
  }: {
    handleUpdateCart: (product: ProductType, updateByQuantity: number) => void;
    cartItems: ProductType[];
  } = useContext(CartContext);

  return (
    <input
      min={0}
      id={`${lineItem.product_id}`}
      className={`w-16 rounded-md ${additionalClassNames}`}
      type="number"
      name="quantity"
      value={
        cartItems.find((item) => item.product_id === lineItem.product_id)
          ?.quantityInCart || 0
      }
      onChange={(e) => {
        if (e.target.value === '') return;
        handleUpdateCart(lineItem, Number(e.target.value));
      }}
    />
  );
}
