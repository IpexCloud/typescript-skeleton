import * as http from 'http'
import createExpressApp from './server'
import { createTerminus } from '@godaddy/terminus'

const port = 8000
const server = http.createServer(createExpressApp(port))

createTerminus(server, {
  onShutdown: () => {
    console.log('server is starting cleanup')
    return Promise.all([
      // your clean logic, like closing database connections
    ])
  }
})

// start the express server
server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`)
})
