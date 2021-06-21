import 'reflect-metadata'
import * as express from 'express'
import * as http from 'http'
import { createTerminus } from '@godaddy/terminus'
import { getConnection } from 'typeorm'
import { config } from 'dotenv'

config({ path: './env/.env' })
import logger from 'utils/logger/logger'
import { PORT } from '~/config'
import { initDbConnection, Databases } from '~/config/databases'
import initREST from 'interfaces/rest'
import initGraphQL from 'interfaces/graphql'

// Start server, init db connections and interfaces
;(async () => {
  const app: express.Application = express()

  await initDbConnection(Databases.database1)

  const server = http.createServer(app)
  initREST(app)
  await initGraphQL(app, server)

  createTerminus(server, {
    onShutdown: () => {
      logger.info('Server is starting cleanup')
      return Promise.all([
        // your clean logic, like closing database connections
        getConnection(Databases.database1).close(),
      ])
    },
  })

  await server.listen(PORT)
  logger.info(`Server running on: http://localhost:${PORT}`)
})()
