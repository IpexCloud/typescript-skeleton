import { NotFoundError, ConflictError } from '@/entities/errors'

import * as DatabaseEntity from '@/model/database1/entities'
import * as usersRepository from '@/respositories/database1/users'

const getUsers = async () => {
  const users = await usersRepository.find()
  return users
}

const getUser = async (userId: number) => {
  const user = await usersRepository.findOne(userId)
  if (!user) {
    throw new NotFoundError(`User with id ${userId} not found`)
  }
  return user
}

const createUser = async (user: DatabaseEntity.User) => {
  const savedUser = await usersRepository.findOne(user.userId)

  if (savedUser) {
    throw new ConflictError(`User with id ${user.userId} already exists`)
  }
  return usersRepository.create(user)
}

const deleteUser = async (userId: number): Promise<void> => {
  const { affected } = await usersRepository.remove(userId)
  if (!affected) {
    throw new NotFoundError()
  }
}

export { getUsers, getUser, createUser, deleteUser }
