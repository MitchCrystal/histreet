type Order = {
  id: string;
  image?: string;
  name: string;
  price: number;
  quantity: number;
}[];


export default function Checkoutcard({values}:{values: Order}) {
  function totalPrice(ord: Order) {
    let total = ord.reduce((accumulator, ord) => {
      return accumulator + ord.price;
    }, 0);
    return total;
  }

  function totalQant(ord: Order) {
    let total = ord.reduce((accumulator: any, ord: any) => {
      let number = Number(accumulator) + Number(ord.quantity);
      return number;
    }, 0);
    return total;
  }

  return (
    <div className="flex flex-col m-auto w-[80%] h-[80%] place-content-center ">
      <div className="grid grid-cols-4 w-full h-full place-content-center ">
        <div className="font-bold col-span-2">ITEMS</div>
        <div className="font-bold col-span-2">QTY</div>
      </div>
      <div className="grid grid-row-4 my-2 w-full h-full ">
        {values.map((order) => {
          return (
            <div className="grid grid-cols-4 my-2 w-full h-full" key={order.id}>
                <img
                  src={order.image??'/missing_img.png'}
                  alt="order-image"
                  className="rounded w-12 h-12 "
                />
              <div className="">
                {order.name}
              </div>
              <div className="">£{order.price}</div>
              <div className="">x {order.quantity}</div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 w-full h-full place-content-center ">
        <div className="font-bold col-span-2">Order Total</div>
        <div className="font-bold">£{totalPrice(values)}</div>
        <div className="font-bold">x{totalQant(values)}</div>
      </div>
    </div>
  );
}

