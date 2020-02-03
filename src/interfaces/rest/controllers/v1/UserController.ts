import {
  Authorized,
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Delete,
  QueryParam
} from 'routing-controllers'
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi'

import { getUsers, getUser, createUser, deleteUser } from '../../../../services/users'
import { UserApiEntity, UsersApiEntity, UsersOperation } from '../../entities/v1/UserApiEntity'

@Authorized()
@OpenAPI({
  security: [{ bearerAuth: [] }]
})
@JsonController()
export class UserController {
  @Get('/users')
  @ResponseSchema(UsersApiEntity)
  @OpenAPI({
    summary: 'Get list of users',
    description: 'Get list of users with pagination'
  })
  async getAll(@QueryParam('page') page: number, @QueryParam('pageSize') pageSize: number) {
    const users = await getUsers()
    return {
      users,
      page,
      pageSize
    }
  }

  @Get('/users/:id')
  @ResponseSchema(UserApiEntity)
  async getOne(@Param('id') id: number) {
    const user = await getUser(id)
    return user
  }

  @Post('/users')
  @ResponseSchema(UsersOperation)
  async post(@Body() user: UserApiEntity) {
    await createUser(user)
    return {
      message: `User successfully saved`,
      userId: user.userId
    }
  }

  @Delete('/users/:id')
  @ResponseSchema(UsersOperation)
  async remove(@Param('id') id: number) {
    await deleteUser(id)
    return {
      message: `User successfully deleted`,
      userId: id
    }
  }
}
