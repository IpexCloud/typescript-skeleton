import * as express from 'express'
import { AuthChecker, buildSchema } from 'type-graphql'
import { ApolloServer, PubSub } from 'apollo-server-express'
import * as http from 'http'

import graphqlLogger from '@/utils/logger/graphqlLogger'
import { UnauthorizedError } from 'entities/errors'

const pubSub = new PubSub()

const authChecker: AuthChecker<any> = (resolverData, roles) => {
  // resolverData includes properties: root, args, context, info
  const ctx = resolverData.context
  const hasAccess = roles.length ? ctx.includes(roles) : true
  return !!ctx && hasAccess
}

const initGraphQL = async (app: express.Application, server: http.Server) => {
  // Register logging middleware for GraphQL
  app.use(graphqlLogger)

  const schema = await buildSchema({
    authChecker,
    resolvers: [__dirname + '/resolvers/**/*.+(js|ts)'],
    pubSub,
  })

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    subscriptions: {
      path: '/',
      onConnect: () => console.log('Websocket connected'),
      onDisconnect: () => console.log('Websocket disconnected'),
    },
    context: ({ req }): Record<string, unknown> | null => {
      // User metadata
      const token = req.headers.authorization
      if (!token) {
        throw new UnauthorizedError()
      }

      const context = {
        ...req,
        user: {
          name: 'John Doe',
          customer: '12345',
          roles: 'ADMIN',
        },
      }
      return context
    },
  })

  apolloServer.applyMiddleware({ app })
  apolloServer.installSubscriptionHandlers(server)
}

export default initGraphQL
