import { EntitySchema } from 'typeorm'

import { Order } from 'datasources/database/entities'

export default new EntitySchema<Order>({
  name: 'Order',
  tableName: 'orders',
  columns: {
    orderId: { type: 'int', primary: true },
    createdAt: { type: 'timestamp' }
  },
  relations: {
    user: { type: 'many-to-one', target: 'User', joinColumn: { name: 'userId', referencedColumnName: 'id' } }
  }
})
