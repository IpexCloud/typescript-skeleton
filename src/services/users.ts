import { getConnection } from 'typeorm'
import { NotFoundError } from 'routing-controllers'

import User from '../model/typeorm/entities/UserEntity'
import { Connections } from '../../config/mysql'

export async function getUsers(): Promise<User[]> {
  const userRepository = getConnection(Connections.database1).getRepository(User)
  const users = await userRepository.find()
  return users
}

export async function getUser(userId: number): Promise<User> {
  const userRepository = getConnection(Connections.database1).getRepository(User)
  const user = await userRepository.findOne({ userId })
  if (!user) throw new NotFoundError('User not found')
  return user
}

export async function createUser(user: User): Promise<User> {
  const userRepository = getConnection(Connections.database1).getRepository(User)
  return userRepository.save(user)
}

export async function deleteUser(userId: number): Promise<void> {
  const userRepository = getConnection(Connections.database1).getRepository(User)
  const { affected } = await userRepository.delete({ userId })
  if (!affected) throw new NotFoundError('User not found')
}
