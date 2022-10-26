import AppDataSource from '~/src/datasources/database'
import * as DataSourceEntities from '~/src/datasources/database/entities'

const OrdersRepository = AppDataSource.getRepository<DataSourceEntities.Order>('Order').extend({
  findUserOrders(userId: number) {
    return this.find({
      relations: ['user'],
      where: { user: { id: userId } }
    })
  }
})

export default OrdersRepository
