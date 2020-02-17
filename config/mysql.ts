import { resolve } from 'path'
import { createConnections } from 'typeorm'

import { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE } from '.'

export enum Connections {
  database1 = 'database1'
}

const getSettings = (name: Connections): object => {
  switch (name) {
    case Connections.database1: {
      return {
        database: DATABASE,
        entities: [resolve(__dirname, '../src/model/typeorm/entities/**')],
        host: DATABASE_HOST,
        password: DATABASE_PASSWORD,
        username: DATABASE_USER
      }
    }
  }
}

export async function initDbConnection(name: Connections, options: object = {}): Promise<void> {
  await createConnections([
    {
      name,
      port: 3306,
      type: 'mysql',
      ...getSettings(name),
      ...options
    }
  ])
}
