import { IsNumber, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'
import { Field, InputType, ObjectType } from 'type-graphql'

@InputType('UserInput')
@ObjectType('User')
class UserDetailApiInput {
  @IsNumber()
  @Field()
  @JSONSchema({ description: 'User id', example: 1 })
  userId: number

  @IsString()
  @Field()
  firstName: string

  @IsString()
  @Field()
  lastName: string

  @IsString()
  @Field()
  address: string

  @IsString()
  @Field()
  city: string
}

class UserDetailApiParams {
  @Field()
  @IsNumber()
  id: number
}

@ObjectType()
class UserNotification {
  @IsString()
  @Field()
  message: string
}

export { UserDetailApiInput, UserDetailApiParams, UserNotification }
