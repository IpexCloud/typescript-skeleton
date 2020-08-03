import { IsNumber, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'
import { Field, InputType, ObjectType } from 'type-graphql'

@InputType('UserInput')
@ObjectType('User')
export class UserApiEntity {
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

@ObjectType()
export class UsersOperationEntity {
  @IsString()
  @Field()
  @JSONSchema({ description: 'Operation result' })
  message: string

  @IsNumber()
  @Field()
  @JSONSchema({ description: 'ID of affected user' })
  userId: number
}

@InputType()
export class UserParamsEntity {
  @Field()
  @IsNumber()
  id: number
}