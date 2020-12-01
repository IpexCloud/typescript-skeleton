import { IsNumber } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
class OrdersListApiParams {
  @Field()
  @IsNumber()
  id: number
}

export { OrdersListApiParams }
