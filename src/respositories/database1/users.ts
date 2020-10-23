import { getConnection } from 'typeorm'

import { UserEntity } from '@/model/typeorm/database1/entities'
import { Connections } from '~/config/databases'

const find = async () => {
  const users = await getConnection(Connections.database1)
    .getRepository(UserEntity)
    .find()
  return users
}

const findOne = async (userId: number) => {
  const user = await getConnection(Connections.database1)
    .getRepository(UserEntity)
    .findOne({ userId })
  return user
}

const create = async (user: UserEntity) => {
  const newUser = await getConnection(Connections.database1)
    .getRepository(UserEntity)
    .save(user)
  return newUser
}

const remove = (userId: number) => {
  return getConnection(Connections.database1)
    .getRepository(UserEntity)
    .delete({ userId })
}

export { find, findOne, create, remove }
