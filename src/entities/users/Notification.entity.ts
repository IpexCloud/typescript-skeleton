import { IsString } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class UserNotification {
  @IsString()
  @Field()
  message: string
}

export default UserNotification
