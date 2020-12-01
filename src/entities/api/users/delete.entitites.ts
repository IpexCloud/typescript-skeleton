import { IsNumber } from 'class-validator'
import { Field } from 'type-graphql'

class UserDeleteApiParams {
  @Field()
  @IsNumber()
  id: number
}

export { UserDeleteApiParams }
