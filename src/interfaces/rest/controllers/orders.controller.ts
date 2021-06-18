import { Authorized, JsonController, Params, Get } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'

import { OrdersListApiParams } from 'entities/api/orders/list.entitites'
import { getUserOrders } from 'services/orders.service'

@Authorized()
@OpenAPI({
  security: [{ bearerAuth: [] }],
  tags: ['Orders']
})
@JsonController()
export class OrdersController {
  @Get('/orders/:id')
  @OpenAPI({
    summary: 'Get list of orders from user'
  })
  async getAll(@Params() { id }: OrdersListApiParams) {
    const orders = await getUserOrders(id)
    return orders
  }
}
