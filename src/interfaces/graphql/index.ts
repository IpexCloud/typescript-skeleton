import * as express from 'express'
import { AuthChecker, buildSchema } from 'type-graphql'
import * as expressGraphql from 'express-graphql'
import graphqlPlaygroundMiddlewareExpress from 'graphql-playground-middleware-express'
import { GRAPHQL_ENDPOINT, GRAPHQL_PLAYGROUND_ENDPOINT } from '../../../config'

const authChecker: AuthChecker<any> = (resolverData, roles) => {
  // resolverData includes properties: root, args, context, info
  const ctnx = resolverData.context()
  const hasAccess = roles.length ? ctnx.includes(roles) : true
  return !!ctnx && hasAccess
}

export default async function initGraphQL(app: express.Application): Promise<express.Application> {
  const schema = await buildSchema({
    authChecker,
    resolvers: [__dirname + '/resolvers/**/*.+(js|ts)']
  })

  app.use(
    GRAPHQL_ENDPOINT,
    expressGraphql(async request => ({
      schema,
      context: (): object | null => {
        const token = request.headers.authorization
        if (!token) return null
        return {
          user: 'John Doe',
          customer: '12345',
          roles: 'ADMIN'
        }
      }
    }))
  )

  app.get(
    GRAPHQL_PLAYGROUND_ENDPOINT,
    graphqlPlaygroundMiddlewareExpress({
      endpoint: GRAPHQL_ENDPOINT
    })
  )

  return app
}
