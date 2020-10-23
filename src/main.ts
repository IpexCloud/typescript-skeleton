import 'reflect-metadata'
import * as express from 'express'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import { createTerminus } from '@godaddy/terminus'
import { getConnection } from 'typeorm'

import { logger } from './utils/logger/logger'
import { PORT } from '~/config'
import { initDbConnection, Connections } from '~/config/databases'
import initREST from './interfaces/rest'
import initGraphQL from './interfaces/graphql'

// Start server, init db connections and interfaces
;(async function() {
  const app: express.Application = express()

  await initDbConnection(Connections.database1)

  app.use(bodyParser.json())

  const server = http.createServer(app)
  initREST(app)
  await initGraphQL(app, server)

  createTerminus(server, {
    onShutdown: () => {
      logger.info('Server is starting cleanup')
      return Promise.all([
        // your clean logic, like closing database connections
        getConnection(Connections.database1).close()
      ])
    }
  })

  await server.listen(PORT)
  logger.info(`Server running on: http://localhost:${PORT}`)
})()
