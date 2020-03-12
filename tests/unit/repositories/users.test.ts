import { getConnection } from 'typeorm'

import { initDbConnection, Connections } from '~/config/mysql'
import * as usersRepository from '@/respositories/database1/users'

describe('Users repository', () => {
  beforeAll(async () => {
    await initDbConnection(Connections.database1)
  })

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
    await getConnection(Connections.database1).close()
    done()
  })
})
