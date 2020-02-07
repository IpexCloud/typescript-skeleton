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
        host: DATABASE_HOST,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE,
        entities: [resolve(__dirname, '../src/model/typeorm/entities/**')]
      }
    }
  }
}

export async function initDbConnection(name: Connections, options: object = {}): Promise<void> {
  await createConnections([
    {
      name,
      type: 'mysql',
      port: 3306,
      ...getSettings(name),
      ...options
    }
  ])
}
