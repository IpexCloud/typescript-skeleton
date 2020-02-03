import { Authorized, JsonController, Param, Get } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'

import { getUserOrders } from '../../../../services/orders'

@Authorized()
@OpenAPI({
  security: [{ bearerAuth: [] }]
})
@JsonController()
export class UserController {
  @Get('/orders/:userId')
  @OpenAPI({
    summary: 'Get list of orders from user'
  })
  async getAll(@Param('userId') userId: number) {
    const orders = await getUserOrders(userId)
    return orders
  }
}
