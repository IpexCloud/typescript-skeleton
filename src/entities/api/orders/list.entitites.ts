import { IsNotEmpty, IsNumber } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
class OrderListApiParams {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id: number
}

export { OrderListApiParams as Params }
