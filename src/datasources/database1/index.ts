import { resolve } from 'path'
import { DataSource } from 'typeorm'

import { DATABASE_URL } from '~/config'

const AppDataSource = new DataSource({
  type: 'mysql',
  url: DATABASE_URL,
  entities: [resolve(__dirname, '../database1/entities/**')]
})

export default AppDataSource
