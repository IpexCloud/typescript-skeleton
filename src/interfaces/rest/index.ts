import { useExpressServer, getMetadataArgsStorage, Action } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { getFromContainer, MetadataStorage } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import * as swaggerUi from 'swagger-ui-express'
import * as express from 'express'
import { requestLogger, setLoggerSilent, errorLogger } from '../../util/logger/logger'

import { version } from '../../../package.json'

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
  setLoggerSilent(false)
  app.use(requestLogger)
  const routingControllersOptions = {
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204
    },
    cors: true,
    // routePrefix: "/api", //
    controllers: [__dirname + '/controllers/**/*.+(js|ts)'],
    authorizationChecker
  }
  useExpressServer(app, routingControllersOptions)
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

  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(spec))
  app.use(errorLogger)
}
