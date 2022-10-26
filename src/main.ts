import 'reflect-metadata'
import * as express from 'express'
import * as http from 'http'
import { createTerminus } from '@godaddy/terminus'

import { loadConfig } from '~/config/load'
loadConfig()

import logger from 'utils/logger/logger'
import env from '~/config'
import AppDataSource from 'datasources/database'
import initREST from 'interfaces/rest'
import initGraphQL from 'interfaces/graphql'
import { initCache } from '~/config/cache'
import { initAuthChecker } from 'utils/auth/auth.checker'

// Start server, init db connections and interfaces
;(async () => {
  try {
    logger.info('APP_STARTED')
    const app: express.Application = express()

    await AppDataSource.initialize()
    const cache = await initCache()
    initAuthChecker(cache)

    const server = http.createServer(app)
    initREST(app)
    await initGraphQL(app, server)

    createTerminus(server, {
      onShutdown: () => {
        logger.info('Server is starting cleanup')
        return Promise.all([AppDataSource.destroy()])
      }
    })

    await server.listen(env.port)
    logger.info(`Server running on: http://localhost:${env.port}`)
  } catch (error) {
    logger.error(error.message, { data: error })
    process.exit(1)
  }
})()
