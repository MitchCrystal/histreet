import prisma from '../../utils/prisma';

export async function getAddress(addressId: any) {
  const address = await prisma.address.findFirst({
    where: {
      address_id: addressId,
    },
  });
  if (!address) throw new Error('address id is required');
  return address;
}
