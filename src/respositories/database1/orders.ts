import { getConnection } from 'typeorm'

import { OrderEntity } from '@/model/typeorm/database1/entities'
import { Connections } from '~/config/databases'

const findUserOrders = async (userId: number) => {
  const orders = await getConnection(Connections.database1)
    .getRepository(OrderEntity)
    .find({
      relations: ['user'],
      where: { user: userId }
    })
  return orders
}

export { findUserOrders }
