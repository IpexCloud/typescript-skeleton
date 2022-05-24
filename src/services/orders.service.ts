import OrdersRepository from 'repositories/database1/orders.repository'
import * as OrderListApiEntities from 'entities/api/orders/list.entitites'

class OrdersService {
  private ordersRepository = OrdersRepository

  async getList(input: OrderListApiEntities.Params) {
    const orders = await this.ordersRepository.findUserOrders(input.id)
    return orders
  }
}

export default OrdersService
