import { Authorized, JsonController, Params, Body, Get, Post, Delete } from 'routing-controllers'
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi'

import UsersService from 'services/users.service'
import * as UserDetailEntities from 'entities/api/users/detail.entities'
import * as CreateUserEntities from 'entities/api/users/create.entities'
import * as DeleteUserEntities from 'entities/api/users/delete.entitites'

@Authorized()
@OpenAPI({ security: [{ bearerAuth: [], basicAuth: [] }] })
@JsonController('/users')
class UsersController {
  @Get()
  @ResponseSchema(UserDetailEntities.Response, { isArray: true })
  @OpenAPI({ description: 'Get list of users', summary: 'Get list of users' })
  async getAll(): Promise<UserDetailEntities.Response[]> {
    const usersService = new UsersService()
    const result = await usersService.getList()
    return result
  }

  @Get('/:id')
  @ResponseSchema(UserDetailEntities.Response)
  async getOne(@Params() params: UserDetailEntities.Params): Promise<UserDetailEntities.Response> {
    const usersService = new UsersService()
    const result = await usersService.getDetail(params)
    return result
  }

  @Post('')
  async create(@Body() input: CreateUserEntities.Input): Promise<void> {
    const usersService = new UsersService()
    await usersService.create(input)
  }

  @Delete('/:id')
  async remove(@Params() params: DeleteUserEntities.Params): Promise<void> {
    const usersService = new UsersService()
    await usersService.delete(params)
  }
}

export { UsersController }
