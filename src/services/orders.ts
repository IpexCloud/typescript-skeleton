import Order from '../model/typeorm/entities/OrderEntity'
import * as ordersRepository from '../respositories/database1/orders'

export async function getUserOrders(userId: number): Promise<Order[]> {
  const orders = await ordersRepository.findUserOrders(userId)
  return orders
}
