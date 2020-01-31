import {
  Authorized,
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  QueryParam
} from 'routing-controllers'
import { ResponseSchema, OpenAPI } from 'routing-controllers-openapi'
import { IsNumber, IsString } from 'class-validator'
import { Type } from 'class-transformer'

class User {
  @IsNumber()
  id: number
  @IsString()
  name: string
}
class Users {
  @Type(() => User)
  users: User[]
  @IsNumber()
  page: number
  @IsNumber()
  pageSize: number
}

@Authorized()
@OpenAPI({
  security: [{ bearerAuth: [] }]
})
@JsonController()
export class UserController {
  @Get('/users')
  @ResponseSchema(Users)
  @OpenAPI({
    summary: 'Get list of users',
    description: 'Get list of users with pagination'
  })
  getAll(@QueryParam('page') page: number, @QueryParam('pageSize') pageSize: number) {
    return {
      users: [
        {
          id: 1,
          name: 'John Doe'
        }
      ],
      page,
      pageSize
    }
  }

  @Get('/users/:id')
  @ResponseSchema(User)
  getOne(@Param('id') id: number) {
    return {
      id,
      name: 'John Doe'
    }
  }

  @Post('/users')
  post(@Body() user: User) {
    return `User ${user.name} saved`
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: User) {
    return `Updating user ${id} to ${user.id}`
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return `User with id ${id} removed`
  }
}
