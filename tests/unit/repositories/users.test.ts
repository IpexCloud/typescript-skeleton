import { getConnection } from 'typeorm'

import { initDbConnection, Databases } from '~/config/databases'
import UsersRepository from '@/repositories/database1/users.repository'

describe('Users repository', () => {
  beforeAll(async () => {
    await initDbConnection(Databases.database1)
  })

  const usersRepository = new UsersRepository()

  test('Create new user', async () => {
    const newUser = {
      userId: 5,
      firstName: 'John',
      lastName: 'Doe',
      address: 'Avenue St',
      city: 'Brno'
    }
    const user = await usersRepository.create(newUser)

    expect(user).toEqual(newUser)
  })

  afterAll(async done => {
    await usersRepository.remove(5)
    await getConnection(Databases.database1).close()
    done()
  })
})
