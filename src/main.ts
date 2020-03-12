import 'reflect-metadata'
import * as express from 'express'
import * as http from 'http'
import { createTerminus } from '@godaddy/terminus'
import { getConnection } from 'typeorm'
import { logger } from './utils/logger/logger'

import { PORT } from '~/config'
import { initDbConnection, Connections } from '~/config/mysql'
import initREST from './interfaces/rest'
import initGraphQL from './interfaces/graphql'
import requestLogger from './utils/logger/requestLogger'
import errorLogger from './utils/logger/errorLogger'

// Start server, init db connections and interfaces
;(async function() {
  const app: express.Application = express()

  await initDbConnection(Connections.database1)

  // Register request logging middleware
  app.use(requestLogger)
  // Register middleware for error logging
  app.use(errorLogger)

  initREST(app)
  await initGraphQL(app)

  const server = http.createServer(app)
  createTerminus(server, {
    onShutdown: () => {
      logger.info('Server is starting cleanup')
      return Promise.all([
        // your clean logic, like closing database connections
        getConnection(Connections.database1).close()
      ])
    }
  })

  server.listen(PORT, () => {
    logger.info(`Server running on: http://localhost:${PORT}`)
  })
})()
