import { getConnection, DeleteResult } from 'typeorm'

import User from '../../model/typeorm/entities/UserEntity'
import { Connections } from '../../../config/mysql'

export async function find(): Promise<User[]> {
  const users = await getConnection(Connections.database1)
    .getRepository(User)
    .find()
  return users
}

export async function findOne(userId: number): Promise<User | undefined> {
  const user = await getConnection(Connections.database1)
    .getRepository(User)
    .findOne({ userId })
  return user
}

export async function create(user: User): Promise<User> {
  return getConnection(Connections.database1)
    .getRepository(User)
    .save(user)
}

export async function remove(userId: number): Promise<DeleteResult> {
  return getConnection(Connections.database1)
    .getRepository(User)
    .delete({ userId })
}
