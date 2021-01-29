import OrdersRepository from '@/repositories/database1/orders.repository'

const getUserOrders = async (userId: number) => {
  const ordersRepository = new OrdersRepository()
  const orders = await ordersRepository.findUserOrders(userId)
  return orders
}

export { getUserOrders }
