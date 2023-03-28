import type { NextApiRequest, NextApiResponse } from 'next';

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (products: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return (
    products.reduce((acc: any, curr: any) => {
      return acc + curr.product_price * curr.quantityInCart;
    }, 0) * 100
  ) // converts to pence
    .toFixed(0);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { products, shippingAddress, billingAddress, store_url } = req.body;

  const lineItemsObj: any = {};

  products.forEach((product: any) => {
    const obj = {
      id: product.product_id,
      qty: product.quantityInCart,
      price: product.product_price,
      name: product.product_name,
      sku: product.SKU,
    };
    const combinedKey = `item_${product.product_id}`;
    lineItemsObj[combinedKey] = JSON.stringify(obj);
  });

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(products),
    currency: 'gbp',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      total_order: calculateOrderAmount(products),
      store_url,
      ...lineItemsObj,
      ...shippingAddress,
      ...billingAddress,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
