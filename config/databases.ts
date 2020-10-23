import { resolve } from 'path'
import { createConnections, ConnectionOptions } from 'typeorm'

import { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE } from '.'

enum Connections {
  database1 = 'database1'
}

const getSettings = (name: Connections): ConnectionOptions => {
  switch (name) {
    case Connections.database1: {
      return {
        type: 'mysql',
        port: 3306,
        host: DATABASE_HOST,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE,
        entities: [resolve(__dirname, `../src/model/typeorm/${Connections.database1}/entities/**`)]
      }
    }
  }
}

const initDbConnection = (name: Connections, options?: { [key: string]: any }) => {
  return createConnections([
    {
      name,
      ...getSettings(name),
      ...options
    }
  ])
}

export { initDbConnection, Connections }
