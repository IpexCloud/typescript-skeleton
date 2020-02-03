import { IsNumber, IsString } from 'class-validator'
import { Type } from 'class-transformer'

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
export class UsersApiEntity {
  @Type(() => UserApiEntity)
  users: UserApiEntity[]
  @IsNumber()
  page: number
  @IsNumber()
  pageSize: number
}

export class UsersOperation {
  @IsString()
  message: string
  @IsNumber()
  userId: number
}
