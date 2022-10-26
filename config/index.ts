import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { MemoryConfig } from 'cache-manager'

import { env } from './load'
import { name, version } from '~/package.json'
import { generateEntities } from 'datasources/database/schemas'

const database: MysqlConnectionOptions = {
  type: 'mysql',
  url: env.DATABASE_URL,
  entities: generateEntities()
}

const cache: MemoryConfig = {
  ttl: 3000
}

export default {
  name,
  port: env.PORT,
  database,
  documentation: {
    title: 'TypeScript skeleton',
    description: 'Example architecture for new project',
    endpoint: 'documentation',
    version
  },
  cache,
  logging: {
    source: env.ENVIRONMENT_NAME,
    silent: env.LOGGER_SILENT
  },
  api: {
    central: env.CENTRAL_API_BASE_URL
  },
  graphql: {
    endpoint: '/graphql'
  },
  platformAuth: {
    url: new URL(`${env.KEYCLOAK_BASE_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/certs`)
  }
}
