import { Authorized, JsonController, Params, Get } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'

import * as OrderListApiEntities from 'entities/api/orders/list.entitites'
import OrdersService from 'services/orders.service'

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [] }], tags: ['Orders'] })
@JsonController('/orders')
class OrdersController {
  @Get('/:id')
  @OpenAPI({ summary: 'Get list of orders from user' })
  async getAll(@Params() params: OrderListApiEntities.Params) {
    const ordersService = new OrdersService()
    const result = await ordersService.getList(params)
    return result
  }
}

export { OrdersController }
