import AppDataSource from 'datasources/database'
import { User } from 'datasources/database/entities'

describe('Users repository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  const usersRepository = AppDataSource.getRepository<User>('User')

  test('Create new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      address: 'Avenue St',
      city: 'Brno'
    }
    const user = await usersRepository.create(newUser)

    expect(user).toEqual(newUser)
  })

  afterAll(async () => {
    await usersRepository.delete(5)
    await AppDataSource.destroy()
  })
})
