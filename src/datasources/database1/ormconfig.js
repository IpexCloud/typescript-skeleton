/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv')
config({ path: './env/.env' })

module.exports = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  migrationsTableName: 'migrations',
  entities: ['.src/datasources/database1/entities/*.ts'],
  migrations: ['./src/datasources/database1/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/datasources/database1/migrations/'
  }
}
