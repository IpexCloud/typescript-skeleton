import { Connection, Repository, getConnection, EntityManager } from 'typeorm'

import { Databases } from '~/config/databases'
import * as DatabaseEntities from 'model/database1/entities'

export default class OrdersRepository {
  private ordersRepository: Repository<DatabaseEntities.Order>
  private connection: Connection | EntityManager

  constructor(connection?: Connection | EntityManager) {
    if (connection) {
      this.connection = connection
    } else {
      this.connection = getConnection(Databases.database1)
    }
    this.ordersRepository = this.connection.getRepository(DatabaseEntities.Order)
  }

  findUserOrders(userId: number) {
    return this.ordersRepository.find({
      relations: ['user'],
      where: { user: userId },
    })
  }
}
