import { Authorized, JsonController, Params, Get } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'

import { UserParamsEntity } from '../../entities/v1/UserApiEntity'
import { getUserOrders } from '../../../../services/orders'

@Authorized()
@OpenAPI({
  security: [{ bearerAuth: [] }],
  tags: ['Orders']
})
@JsonController()
export class OrderController {
  @Get('/orders/:id')
  @OpenAPI({
    summary: 'Get list of orders from user'
  })
  async getAll(@Params() { id }: UserParamsEntity) {
    const orders = await getUserOrders(id)
    return orders
  }
}
