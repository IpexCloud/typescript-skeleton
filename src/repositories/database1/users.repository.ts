import { Connection, Repository, getConnection, EntityManager } from 'typeorm'

import { Databases } from '~/config/databases'
import * as DatabaseEntities from 'model/database1/entities'

export default class UsersRepository {
  private usersRepository: Repository<DatabaseEntities.User>
  private connection: Connection | EntityManager

  constructor(connection?: Connection | EntityManager) {
    if (connection) {
      this.connection = connection
    } else {
      this.connection = getConnection(Databases.database1)
    }
    this.usersRepository = this.connection.getRepository(DatabaseEntities.User)
  }

  find() {
    return this.usersRepository.find()
  }

  findOne(userId: number) {
    return this.usersRepository.findOne({ userId })
  }

  create(user: DatabaseEntities.User) {
    return this.usersRepository.save(user)
  }

  remove(userId: number) {
    return this.usersRepository.delete({ userId })
  }
}
