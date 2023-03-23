import type { NextApiRequest, NextApiResponse } from 'next';

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (products: any) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { products, shippingAddress, billingAddress } = req.body;

  console.log({ products });

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(products),
    currency: 'gbp',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      //   lineItems: JSON.stringify({...products}),
      ...shippingAddress,
      ...billingAddress,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
