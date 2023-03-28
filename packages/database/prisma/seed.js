const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dataPresets = require('./data');

async function main() {
  try {
    await prisma.order.deleteMany();
    await prisma.storefront.deleteMany();
    await prisma.address.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.product.deleteMany();
    await prisma.store.deleteMany();
    await prisma.user.deleteMany();
    console.log('Existing records deleted');
    await prisma.user.createMany({
      data: dataPresets.users,
    });
    await prisma.store.createMany({
      data: dataPresets.stores,
    });
    await prisma.product.createMany({
      data: dataPresets.products,
    });
    await prisma.storefront.createMany({
      data: dataPresets.storeFronts,
    });
    await prisma.customer.createMany({
      data: dataPresets.customers,
    });
    await prisma.address.createMany({
      data: dataPresets.addresses,
    });
    await prisma.order.create({
      data: dataPresets.orders[0],
      include: { products: true },
    });
    await prisma.order.create({
      data: dataPresets.orders[1],
      include: { products: true },
    });
    await prisma.order.create({
      data: dataPresets.orders[2],
      include: { products: true },
    });
    await prisma.order.create({
      data: dataPresets.orders[3],
      include: { products: true },
    });
    await prisma.order.create({
      data: dataPresets.orders[4],
      include: { products: true },
    });
    console.log('Database seeded');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
main();
