import AppDataSource from 'datasources/database1'
import * as DataSourceEntities from 'datasources/database1/entities'

const OrdersRepository = AppDataSource.getRepository(DataSourceEntities.Order).extend({
  findUserOrders(userId: number) {
    return this.find({
      relations: ['user'],
      where: { user: { id: userId } }
    })
  }
})

export default OrdersRepository
