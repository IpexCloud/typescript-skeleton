import { useExpressServer, getMetadataArgsStorage, Action } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { getFromContainer, MetadataStorage } from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { serve, setup } from 'swagger-ui-express'
import express = require('express')

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

export default function createExpressApp(port: number): express.Application {
  const app: express.Application = express()
  const routingControllersOptions = {
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 204
    },
    cors: {
      origin: [`http://localhost:${port}`]
    },
    // routePrefix: "/api", //
    controllers: [__dirname + '/interfaces/rest/controllers/**/*.+(js|ts)'],
    authorizationChecker
  }
  useExpressServer(app, routingControllersOptions)

  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  const schemas = validationMetadatasToSchemas(metadatas, {
    // classTransformerMetadataStorage: defaultMetadataStorage,
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
      title: 'Node-Backend-Boilerplate API',
      version: '1.0.0'
    }
  })
  app.use('/documentation', serve, setup(spec))

  return app
}
