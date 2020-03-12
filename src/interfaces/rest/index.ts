import { useExpressServer, getMetadataArgsStorage, Action } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { getFromContainer, MetadataStorage } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import * as swaggerUi from 'swagger-ui-express'
import * as express from 'express'

import { setLoggerSilent } from '@/utils/logger/logger'
import CorrelationIdMiddleware from './middlewares/correlationIdMiddleware'
import { version } from '~/package.json'

const authorizationChecker = async (action: Action, roles: string[]): Promise<boolean> => {
  // here you can use request/response objects from action
  // also if decorator defines roles it needs to access the action
  // you can use them to provide granular access check
  // checker must return either boolean (true or false)
  // either promise that resolves a boolean value
  const token = action.request.headers.authorization || ''
  if (!token || roles.includes('unknownRole')) return false
  return true
}

export default function initREST(app: express.Application) {
  // Enable logs
  setLoggerSilent(false)

  const routingControllersOptions = {
    authorizationChecker,
    controllers: [__dirname + '/controllers/**/*.+(js|ts)'],
    cors: true,
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204
    },
    middlewares: [CorrelationIdMiddleware]
  }
  useExpressServer(app, routingControllersOptions)

  // Generate documentation
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  const schemas = validationMetadatasToSchemas(metadatas, {
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
        }
      }
    },
    info: {
      description: 'Generated with `routing-controllers-openapi`',
      title: 'Typescript skeleton',
      version
    }
  })
  // Use route for documentation
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(spec))
}
