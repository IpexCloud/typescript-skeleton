import { getConnection } from 'typeorm'

import User from '@/model/typeorm/entities/UserEntity'
import { Connections } from '~/config/mysql'

const find = async () => {
  const users = await getConnection(Connections.database1)
    .getRepository(User)
    .find()
  return users
}

const findOne = async (userId: number) => {
  const user = await getConnection(Connections.database1)
    .getRepository(User)
    .findOne({ userId })
  return user
}

const create = async (user: User) => {
  const newUser = await getConnection(Connections.database1)
    .getRepository(User)
    .save(user)
  return newUser
}

const remove = (userId: number) => {
  return getConnection(Connections.database1)
    .getRepository(User)
    .delete({ userId })
}

export { find, findOne, create, remove }
