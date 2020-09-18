import { getConnection } from 'typeorm'

import Order from '@/model/typeorm/entities/OrderEntity'
import { Connections } from '~/config/mysql'

const findUserOrders = async (userId: number) => {
  const orders = await getConnection(Connections.database1)
    .getRepository(Order)
    .find({
      relations: ['user'],
      where: { user: userId }
    })
  return orders
}

export { findUserOrders }
