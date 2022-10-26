// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require('class-transformer/cjs/storage')
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { resolve } from 'path'
import * as swaggerUi from 'swagger-ui-express'
import * as express from 'express'

import restLogger from 'utils/logger/restLogger'
import CorrelationIdMiddleware from './middlewares/correlation-id.middleware'
import ErrorHandlerMiddleware from './middlewares/error-handler.middleware'
import { version, name, description } from '~/package.json'

const initREST = (app: express.Application) => {
  // Register logging middleware for REST
  app.use(restLogger)
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const routingControllersOptions = {
    controllers: [resolve(__dirname, './controllers/**/*.+(js|ts)')],
    defaultErrorHandler: false,
    cors: true,
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204
    },
    validation: {
      whitelist: true,
      forbidNonWhitelisted: true
    },
    middlewares: [CorrelationIdMiddleware, ErrorHandlerMiddleware]
  }
  useExpressServer(app, routingControllersOptions)

  // Generate documentation
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/'
  })
  const storage = getMetadataArgsStorage()
  const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          scheme: 'bearer',
          type: 'http'
        },
        basicAuth: {
          scheme: 'basic',
          type: 'http'
        }
      }
    },
    info: {
      title: name,
      description,
      version
    }
  })

  // Use route for documentation
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(spec))
  app.get('/', (_, res) => res.redirect('/documentation'))
}

export default initREST
