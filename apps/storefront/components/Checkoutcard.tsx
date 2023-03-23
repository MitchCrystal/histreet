type Order = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
};


type Orders = Order[];

export default function Checkoutcard({CheckoutProps}:Order): JSX.Element {
  function totalPrice(ord: Orders) {
    let total = ord.reduce((accumulator, ord) => {
      return accumulator + ord.price;
    }, 0);
    return total;
  }

  function totalQant(ord: Orders) {
    console.log(ord);
    let total = ord.reduce((accumulator: any, ord: any) => {
      let number = Number(accumulator) + Number(ord.quantity);
      return number;
    }, 0);
    return total;
  }

  return (
    <div className="flex flex-col m-auto w-[80%] h-[80%] place-content-center ">
      <div className="grid grid-cols-4 w-full h-full place-content-center ">
        <div></div>
        <div className="flex place-content-center font-bold ">ITEMS</div>
        <div></div>
        <div className="flex place-content-center font-bold">QTY</div>
      </div>
      <div className="grid grid-row-4 my-2 w-full h-full ">
        {CheckoutProps.map((order) => {
          return (
            <div className="grid grid-cols-4 my-2 w-full h-full" key={order.id}>
              <div className="flex rounded h-10 w-10 ">
                <img
                  src={order.image}
                  alt="order-image"
                  className="flex rounded w-full h-full "
                />
              </div>
              <div className="flex place-content-center ">
                {order.name}
              </div>
              <div className="flex place-content-center ">£{order.price}</div>
              <div className="flex place-content-center ">x {order.quantity}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 w-full h-full place-content-center ">
        <div></div>
        <div className="flex place-content-center font-bold">Order Total</div>
        <div className="flex place-content-center font-bold">£{totalPrice(CheckoutProps)}</div>
        <div className="flex place-content-center font-bold">x{totalQant(CheckoutProps)}</div>
      </div>
    </div>
  );
}
