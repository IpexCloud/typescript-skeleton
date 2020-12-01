import { getConnection } from 'typeorm'

import * as DatabaseEntities from '@/model/database1/entities'
import { Databases } from '~/config/databases'

const find = async () => {
  const users = await getConnection(Databases.database1)
    .getRepository(DatabaseEntities.User)
    .find()
  return users
}

const findOne = async (userId: number) => {
  const user = await getConnection(Databases.database1)
    .getRepository(DatabaseEntities.User)
    .findOne({ userId })
  return user
}

const create = async (user: DatabaseEntities.User) => {
  const newUser = await getConnection(Databases.database1)
    .getRepository(DatabaseEntities.User)
    .save(user)
  return newUser
}

const remove = (userId: number) => {
  return getConnection(Databases.database1)
    .getRepository(DatabaseEntities.User)
    .delete({ userId })
}

export { find, findOne, create, remove }
