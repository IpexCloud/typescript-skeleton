import { Authorized, JsonController, Params, Body, Get, Post, Delete } from 'routing-controllers'
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi'

import { getUsers, getUser, createUser, deleteUser } from '@/services/users'
import { UserApiEntity, UserParamsEntity, UsersOperationEntity } from '@/entities/v1/UserApiEntity'

@Authorized()
@OpenAPI({
  security: [{ bearerAuth: [], basicAuth: [] }]
})
@JsonController()
export class UserController {
  @Get('/users')
  @ResponseSchema(UserApiEntity, { isArray: true })
  @OpenAPI({
    description: 'Get list of users',
    summary: 'Get list of users'
  })
  async getAll(): Promise<UserApiEntity[]> {
    const users = await getUsers()
    return users
  }

  @Get('/users/:id')
  @ResponseSchema(UserApiEntity)
  async getOne(@Params() { id }: UserParamsEntity): Promise<UserApiEntity> {
    const user = await getUser(id)
    return user
  }

  @Post('/users')
  @ResponseSchema(UsersOperationEntity)
  async create(@Body() user: UserApiEntity): Promise<UsersOperationEntity> {
    await createUser(user)
    return {
      message: `User successfully saved`,
      userId: user.userId
    }
  }

  @Delete('/users/:id')
  @ResponseSchema(UsersOperationEntity)
  async remove(@Params() { id }: UserParamsEntity): Promise<UsersOperationEntity> {
    await deleteUser(id)
    return {
      message: `User successfully deleted`,
      userId: id
    }
  }
}
