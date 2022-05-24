import { IsNumber, IsNotEmpty } from 'class-validator'
import { Field } from 'type-graphql'

import User from 'entities/users/User.entity'

class UserDetailApiParams {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  id: number
}

export { User as Response, UserDetailApiParams as Params }
