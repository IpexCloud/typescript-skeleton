import { NotFoundError } from 'routing-controllers'

import User from '../model/typeorm/entities/UserEntity'
import * as usersRepository from '../respositories/database1/users'

export async function getUsers(): Promise<User[]> {
  const users = await usersRepository.find()
  return users
}

export async function getUser(userId: number): Promise<User> {
  const user = await usersRepository.findOne(userId)
  if (!user) throw new NotFoundError('User not found')
  return user
}

export async function createUser(user: User): Promise<User> {
  return usersRepository.create(user)
}

export async function deleteUser(userId: number): Promise<void> {
  const { affected } = await usersRepository.remove(userId)
  if (!affected) throw new NotFoundError('User not found')
}
