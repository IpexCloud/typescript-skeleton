import { getRepository } from 'typeorm'
import User from '../model/typeorm/entities/UserEntity'

export async function getUsers(): Promise<User[]> {
  const userRepository = getRepository(User)
  const users = await userRepository.find()
  return users
}

export async function getUser(userId: number): Promise<User | null> {
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({ userId })
  if (!user) return null
  return user
}

export async function createUser(user: User) {
  const userRepository = getRepository(User)
  await userRepository.save(user)
}

export async function deleteUser(userId: number) {
  const userRepository = getRepository(User)
  await userRepository.delete({ userId })
}
