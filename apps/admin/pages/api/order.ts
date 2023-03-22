import prisma from '../../utils/prisma';

export async function getOrder(orderId: any) {
  const order = await prisma.order.findUnique({
    where: {
      order_id: orderId,
    },
  });
  // if (!order) throw new Error('id is required');
  return order;
}
