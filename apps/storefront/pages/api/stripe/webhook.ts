// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      message: string;
    }
  | { successfulPayment: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body.data.object.metadata);
  const {
    email,
    store_url,
    billing_firstName,
    billing_postcode,
    billing_country,
    billing_city,
    billing_secondLine,
    billing_lastName,
    billing_county,
    billing_firstLine,
    postcode,
    country,
    county,
    secondLine,
    firstLine,
    lastName,
    firstName,
    city,
    phoneNumber,
  } = req.body.data.object.metadata;

  console.log(req.body);

  try {
    if (req.body.type !== 'charge.succeeded') {
      res.status(500).json({ successfulPayment: false });
    } else {
      const store = await prisma.store.findUnique({
        where: {
          store_url: store_url,
        },
        select: {
          store_id: true,
        },
      });

      let customer;
      customer = await prisma.customer.findFirst({
        where: {
          customer_email: email,
          store_id: store?.store_id,
        },
        select: {
          customer_id: true,
        },
      });

      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            customer_first_name: firstName,
            customer_last_name: lastName,
            phone_number: String(phoneNumber),
            customer_email: email,
            store: {
              connect: {
                store_id: store?.store_id,
              },
            },
          },
        });
      }

      const getOrderCountForStore = await prisma.order.count({
        where: {
          store_id: store?.store_id,
        },
      });

      console.log('getOrderCountForStore', getOrderCountForStore);

      const order = await prisma.order.create({
        data: {
          customer: {
            connect: {
              customer_id: customer.customer_id,
            },
          },
          friendly_order_number: getOrderCountForStore + 1000,
          total_order_cost: 10,
          payment_id: req.body.data.object.payment_intent,
          order_details: [
            { id: 'clfk8f02m0002ono088oiycn3', qty: 8, price: 18 },
          ],
          store: {
            connect: {
              store_id: store?.store_id,
            },
          },
          bill_address: {
            create: {
              address_first_name: billing_firstName ?? firstName,
              address_last_name: billing_lastName ?? lastName,
              address_line_1: billing_firstLine ?? firstLine,
              address_line_2: billing_secondLine ?? secondLine,
              city: billing_city ?? city,
              county: billing_county ?? county,
              country: billing_country ?? country,
              postcode: billing_postcode ?? postcode,
              customer: {
                connect: {
                  customer_id: customer.customer_id,
                },
              },
            },
          },
          ship_address: {
            create: {
              address_first_name: firstName,
              address_last_name: lastName,
              address_line_1: firstLine,
              address_line_2: secondLine,
              city: city,
              county: county,
              country: country,
              postcode: postcode,
              customer: {
                connect: {
                  customer_id: customer.customer_id,
                },
              },
            },
          },
        },
      });
      res.status(200).json({ message: 'Order created' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order' });
  }
}
