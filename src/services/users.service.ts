import { NotFoundError, ConflictError } from 'entities/errors'
import AppDataSource from 'datasources/database1'

import * as DataSourceEntities from 'datasources/database1/entities'
import * as UserDetailEntities from 'entities/api/users/detail.entities'
import * as CreateUserEntities from 'entities/api/users/create.entities'
import * as DeleteUserEntities from 'entities/api/users/delete.entitites'

class UsersService {
  usersRepository = AppDataSource.getRepository(DataSourceEntities.User)

  async getList(): Promise<UserDetailEntities.Response[]> {
    const users = await this.usersRepository.find()
    return users
  }

  async getDetail(input: UserDetailEntities.Params): Promise<UserDetailEntities.Response> {
    const user = await this.usersRepository.findOne({ where: { id: input.id } })
    if (!user) {
      throw new NotFoundError(`User with id ${input.id} not found`)
    }
    return user
  }

  async create(input: CreateUserEntities.Input) {
    const savedUser = await this.usersRepository.findOne({ where: { id: input.id } })

    if (savedUser) {
      throw new ConflictError(`User with id ${input.id} already exists`)
    }
    return this.usersRepository.create(input)
  }

  async delete(input: DeleteUserEntities.Params) {
    const { affected } = await this.usersRepository.delete(input.id)
    if (!affected) {
      throw new NotFoundError()
    }
  }
}

export default UsersService
