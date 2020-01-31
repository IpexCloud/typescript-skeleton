import { useExpressServer } from 'routing-controllers'
import express = require('express')

export default function createExpressApp(port: number): express.Application {
  const app: express.Application = express()

  useExpressServer(app, {
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204
    },
    cors: {
      origin: [`http://localhost:${port}`]
    },
    // routePrefix: "/api", //
    controllers: [__dirname + '/interfaces/rest/controllers/**/*.+(js|ts)']
  })

  return app
}
