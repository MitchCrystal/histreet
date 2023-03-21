import { PrismaClient } from 'database';

const prisma = new PrismaClient();

export async function getCustomer(customerId: any) {
  const customer = await prisma.customer.findFirst({
    where: {
      customer_id: customerId,
    },
  });
  if (!customer) throw new Error('customer id is required');
  return customer;
}
