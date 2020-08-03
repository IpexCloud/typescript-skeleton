/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv')
config({ path: './env/.env' })

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  migrationsTableName: 'migrations',
  entities: '[.src/model/typeorm/entities/*.ts]',
  migrations: '[./src/model/typeorm/migrations/*.ts]',
  cli: {
    migrationsDir: './src/model/typeorm/migrations/'
  }
}
