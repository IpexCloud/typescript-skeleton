import { EntitySchema } from 'typeorm'

import { User } from 'datasources/database/entities'

export default new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: { type: 'int', primary: true, name: 'userId' },
    firstName: { type: 'varchar' },
    lastName: { type: 'varchar' },
    address: { type: 'varchar' },
    city: { type: 'varchar' }
  },
  relations: {
    orders: { type: 'one-to-many', target: 'Order', inverseSide: 'user' }
  }
})
