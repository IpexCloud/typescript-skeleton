import 'reflect-metadata'
import * as express from 'express'
import * as http from 'http'
import { createTerminus } from '@godaddy/terminus'
import { config } from 'dotenv'

config({ path: './env/.env' })
import logger from 'utils/logger/logger'
import { PORT } from '~/config'
import AppDataSource from 'datasources/database1'
import initREST from 'interfaces/rest'
import initGraphQL from 'interfaces/graphql'

// Start server, init db connections and interfaces
;(async () => {
  try {
    logger.info(`APP_STARTED`)
    const app: express.Application = express()

    await AppDataSource.initialize()

    const server = http.createServer(app)
    initREST(app)
    await initGraphQL(app, server)

    createTerminus(server, {
      onShutdown: () => {
        logger.info('Server is starting cleanup')
        return Promise.all([AppDataSource.destroy()])
      }
    })

    await server.listen(PORT)
    logger.info(`Server running on: http://localhost:${PORT}`)
  } catch (error) {
    logger.error(error.message, { data: error })
    process.exit(1)
  }
})()
