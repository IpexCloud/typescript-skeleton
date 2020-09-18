import * as ordersRepository from '@/respositories/database1/orders'

const getUserOrders = async (userId: number) => {
  const orders = await ordersRepository.findUserOrders(userId)
  return orders
}

export { getUserOrders }
