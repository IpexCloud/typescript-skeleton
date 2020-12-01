import { getConnection } from 'typeorm'

import * as DatabaseEntity from '@/model/database1/entities'
import { Databases } from '~/config/databases'

const findUserOrders = async (userId: number) => {
  const orders = await getConnection(Databases.database1)
    .getRepository(DatabaseEntity.Order)
    .find({
      relations: ['user'],
      where: { user: userId }
    })
  return orders
}

export { findUserOrders }
