import { useExpressServer, getMetadataArgsStorage, Action } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { defaultMetadataStorage } from 'class-transformer/storage'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { resolve } from 'path'
import * as swaggerUi from 'swagger-ui-express'
import * as express from 'express'
import * as bodyParser from 'body-parser'

import restLogger from '@/utils/logger/restLogger'
import CorrelationIdMiddleware from './middlewares/correlationId.middleware'
import ErrorHandlerMiddleware from './middlewares/errorHandler.middleware'
import { version, name, description } from '~/package.json'
import { UnauthorizedError } from '#/errors'

const authorizationChecker = (action: Action, roles: string[]): boolean => {
  // here you can use request/response objects from action
  // also if decorator defines roles it needs to access the action
  // you can use them to provide granular access check
  // checker must return either boolean (true or false)
  // either promise that resolves a boolean value
  const token = action.request.headers.authorization || ''
  if (!token || roles.includes('unknownRole')) {
    throw new UnauthorizedError()
  }

  return true
}

const initREST = (app: express.Application) => {
  // Register logging middleware for REST
  app.use(restLogger)
  app.use(bodyParser.json())

  const routingControllersOptions = {
    authorizationChecker,
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
}

export default initREST
