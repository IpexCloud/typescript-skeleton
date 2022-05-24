import { IsNumber, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'
import { Field, InputType, ObjectType } from 'type-graphql'

@InputType('UserInput', { isAbstract: true })
@ObjectType({ isAbstract: true })
class User {
  @IsNumber()
  @Field()
  @JSONSchema({ description: 'User id', example: 1 })
  id: number

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

export default User
