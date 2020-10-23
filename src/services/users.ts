import { NotFoundError } from '@/entities/errors'

import { UserEntity } from '@/model/typeorm//database1/entities'
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

const createUser = (user: UserEntity) => {
  return usersRepository.create(user)
}

const deleteUser = async (userId: number): Promise<void> => {
  const { affected } = await usersRepository.remove(userId)
  if (!affected) {
    throw new NotFoundError()
  }
}

export { getUsers, getUser, createUser, deleteUser }
