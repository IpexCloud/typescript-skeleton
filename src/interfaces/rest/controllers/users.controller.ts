import { Authorized, JsonController, Params, Body, Get, Post, Delete } from 'routing-controllers'
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi'

import { getUsers, getUser, createUser, deleteUser } from 'services/users.service'
import { UserDetailApiInput, UserDetailApiParams } from 'entities/api/users/detail.entities'
import { UserDeleteApiParams } from 'entities/api/users/delete.entitites'

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [], basicAuth: [] }] })
@JsonController()
export class UsersController {
  @Get('/users')
  @ResponseSchema(UserDetailApiInput, { isArray: true })
  @OpenAPI({
    description: 'Get list of users',
    summary: 'Get list of users'
  })
  async getAll(): Promise<UserDetailApiInput[]> {
    const users = await getUsers()
    return users
  }

  @Get('/users/:id')
  @ResponseSchema(UserDetailApiInput)
  async getOne(@Params() { id }: UserDetailApiParams): Promise<UserDetailApiInput> {
    const user = await getUser(id)
    return user
  }

  @Post('/users')
  async create(@Body() user: UserDetailApiInput): Promise<void> {
    await createUser(user)
  }

  @Delete('/users/:id')
  async remove(@Params() { id }: UserDeleteApiParams): Promise<void> {
    await deleteUser(id)
  }
}
