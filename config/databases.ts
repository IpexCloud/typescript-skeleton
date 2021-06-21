import { resolve } from 'path'
import { createConnection, ConnectionOptions } from 'typeorm'

import { DATABASE_URL } from '.'

enum Databases {
  database1 = 'database1',
}

const getSettings = (name: Databases): ConnectionOptions => {
  switch (name) {
    case Databases.database1: {
      return {
        type: 'mysql',
        url: DATABASE_URL,
        entities: [resolve(__dirname, `../src/model/${Databases.database1}/entities/**`)],
      }
    }
  }
}

const initDbConnection = (database: Databases, name?: string, options?: { [key: string]: any }) =>
  createConnection({
    name: database + (name || ''),
    ...getSettings(database),
    ...options,
  })

export { initDbConnection, Databases }
