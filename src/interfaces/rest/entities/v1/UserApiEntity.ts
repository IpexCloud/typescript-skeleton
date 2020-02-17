import { IsNumber, IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export class UserApiEntity {
  @IsNumber()
  @JSONSchema({ description: 'User id', example: 1 })
  userId: number
  @IsString()
  firstName: string
  @IsString()
  lastName: string
  @IsString()
  address: string
  @IsString()
  city: string
}

export class UsersOperationEntity {
  @IsString()
  @JSONSchema({ description: 'Operation result' })
  message: string
  @JSONSchema({ description: 'ID of affected user' })
  @IsNumber()
  userId: number
}

export class UserParamsEntity {
  @IsNumber()
  id: number
}
