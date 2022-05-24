import { IsNotEmpty, IsNumber } from 'class-validator'
import { Field } from 'type-graphql'

class DeleteUserApiParams {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id: number
}

export { DeleteUserApiParams as Params }
