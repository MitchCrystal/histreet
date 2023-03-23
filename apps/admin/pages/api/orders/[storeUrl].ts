// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Customer } from 'database';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

type OrderDTO = {
  order_id: string;
  order_number: number;
  customer_name: string;
  total_items: number;
  order_total: number;
  date_placed: Date;
};

type OrderDB = {
  order_id: string;
  friendly_order_number: number;
  customer: Customer;
  total_order_cost: number;
  order_details: OrderDetails;
  created_at: Date;
};

type OrderDetails = {
  product_id: string;
  quantity: number;
  price: number;
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderDTO[]>
) {
  const storeUrl = req.query.storeUrl;
  console.log(storeUrl, 'storeUrl');
  if (storeUrl == null) {
    return res.status(400);
  } else {
    const store_id = await findStoreId(storeUrl as string);
    const orders = await findOrders(store_id?.store_id as string);
    return res.status(200).json(getOrderDTO(orders as OrderDB[]));
  }
}

const findStoreId = async (storeUrl: string) => {
  const response = await prisma.store.findFirst({
    where: { store_url: storeUrl },
    select: {
      store_id: true,
    },
  });
  return response;
};

const findOrders = async (findStoreId: string) => {
  const response = await prisma.order.findMany({
    where: { store_id: findStoreId },

    select: {
      order_id: true,
      friendly_order_number: true,
      created_at: true,
      total_order_cost: true,
      order_details: true,
      customer: true,
    },
  });
  //add another prisma function to target storeUrl using store id from fn above and return both
  return response;
};

const getOrderDTO = (orders: OrderDB[]) => {
  return orders.map((order) => {
    const orderDTO: OrderDTO = {
      order_id: order.order_id,
      order_number: order.friendly_order_number,
      customer_name:
        order.customer.customer_first_name +
        ' ' +
        order.customer.customer_last_name,
      total_items: getTotalItems(order.order_details),
      order_total: order.total_order_cost,
      date_placed: order.created_at,
    };
    return orderDTO;
  });
};

const getTotalItems = (orderDetails: OrderDetails) => {
  return orderDetails
    .map((orderDetailString) => orderDetailString.quantity)
    .reduce((a, b) => a + b, 0);
};
