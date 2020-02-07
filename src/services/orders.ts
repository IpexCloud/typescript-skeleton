import { getConnection } from 'typeorm'
import Order from '../model/typeorm/entities/OrderEntity'
import { Connections } from '../../config/mysql'

export async function getUserOrders(userId: number): Promise<Order[]> {
  const orderRepository = getConnection(Connections.database1).getRepository(Order)
  const orders = await orderRepository.find({ where: { userId }, relations: ['user'] })
  return orders
}
