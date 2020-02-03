import { getRepository } from 'typeorm'
import Order from '../model/typeorm/entities/OrderEntity'

export async function getUserOrders(userId: number): Promise<Order[]> {
  const orderRepository = getRepository(Order)
  const orders = await orderRepository.find({ where: { userId }, relations: ['user'] })
  return orders
}
