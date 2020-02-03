import * as express from 'express'
import * as http from 'http'
import { createTerminus } from '@godaddy/terminus'
import { createConnection } from 'typeorm'

import { PORT, DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } from '../config'
import initREST from './interfaces/rest'

const app: express.Application = express()
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

server.listen(PORT, async () => {
  await createConnection({
    type: 'mysql',
    host: DATABASE_HOST,
    port: 3306,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE,
    entities: [__dirname + '/model/typeorm/entities/**.ts']
  })
  // tslint:disable-next-line:no-console
  console.log(`Server started  on port ${PORT}`)
})
