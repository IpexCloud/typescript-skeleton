import { IsNumber, IsString } from 'class-validator'
export class UserApiEntity {
  @IsNumber()
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
  message: string
  @IsNumber()
  userId: number
}

export class UserParamsEntity {
  @IsNumber()
  id: number
}
