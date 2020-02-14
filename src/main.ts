import 'reflect-metadata'
import * as express from 'express'
import * as http from 'http'
import { createTerminus } from '@godaddy/terminus'
import {logger} from './util/logger/logger'

import { PORT } from '../config'
import { initDbConnection, Connections } from '../config/mysql'
import initREST from './interfaces/rest'

// Start server, init db connections and interfaces
;(async function() {
  const app: express.Application = express()

  await initDbConnection(Connections.database1)

  initREST(app)
  const server = http.createServer(app)
  createTerminus(server, {
    onShutdown: () => {
      console.log('server is starting cleanup')
      return Promise.all([
        // your clean logic, like closing database connections
      ])
    }
  })

  server.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    logger.info(`Server running on: http://localhost:${PORT}`)
  })
})()
