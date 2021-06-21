import { createLogger, format, transports, LoggerOptions } from 'winston'
import { Request } from 'express'
import { logger } from 'express-winston'
import { hostname } from 'os'

import { version } from '~/package.json'
import { ENVIRONMENT_NAME } from '~/config'
import { getAuthType, getBasicAuthMeta, getBearerAuthMeta } from 'utils/auth'
import { getStatusCodeFromError } from 'utils/helpers'

interface LogFormat {
  '@timestamp': string
  '@version': string
  source: string
  host: string
  instanceId: string
  user: string | (() => string) | null
  correlationId: string | null
  forwardedFor: string | null
  severity: string
  route: string
  path: string
  responseTime: number
  statusCode: number
  method: string
  authorization: string | null
  responsePayload?: string | null
  gqlOperation: string
  gqlRawQuery: string
  gqlVariables: string
  qqlName: string
}

const requestFormat = format.printf((data) => {
  const { meta, level, timestamp } = data
  const auth = meta.req.headers.authorization || null
  let userId: LogFormat['user'] = null
  const authType = getAuthType(auth)

  if (authType === 'basicAuth') {
    const credentials = getBasicAuthMeta(auth)
    userId = credentials ? credentials.user : null
  } else if (authType === 'bearerToken') {
    const tokenPayload = getBearerAuthMeta(auth)
    userId = tokenPayload?.sub || null
  }

  let log: LogFormat = {
    '@timestamp': timestamp,
    '@version': version,
    authorization: auth ? `...${auth.substr(auth.length - 15)}` : null,
    correlationId: meta.req.headers['x-correlation-id'] || meta.req.headers['x-amzn-trace-id'] || null,
    forwardedFor: meta.req.headers['x-forwarded-for'] ? meta.req.headers['x-forwarded-for'].split(',')[0] : null,
    host: hostname(),
    instanceId: hostname(),
    method: meta.req.method,
    path: meta.req.url, // TODO: get pure route without parameters e.g. /users/{userId}
    responseTime: meta.responseTime,
    route: meta.req.url,
    severity: level,
    source: ENVIRONMENT_NAME,
    statusCode: meta.res.statusCode,
    user: userId,
    gqlOperation: meta.req.body.query.split(' ')[0],
    gqlRawQuery: meta.req.body.query,
    gqlVariables: JSON.stringify(meta.req.body.variables),
    qqlName: meta.req.body.operationName, // TODO: parse raw graphql query and add '#' between operations
  }

  if (meta.res.body.errors?.length) {
    log = {
      ...log,
      responsePayload: JSON.stringify(meta.res.body.errors),
      severity: 'error',
      statusCode: getStatusCodeFromError(meta.res.body.errors[0]?.extensions?.exception),
    }
  }

  return JSON.stringify(log)
})

const loggerOptions: LoggerOptions = {
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.timestamp(), requestFormat),
    }),
  ],
}

export default logger({
  ignoreRoute: (req: Request) => {
    if (req.url === '/graphql' && req.body.operationName === 'IntrospectionQuery') {
      return true
    }
    if (req.method === 'GET') {
      return true
    }
    if (req.url === '/graphql') {
      return false
    } // log only /graphql route

    return true
  },
  meta: true,
  requestWhitelist: ['headers', 'query', 'body', 'method', 'url'],
  responseWhitelist: ['body', 'statusCode'],
  winstonInstance: createLogger(loggerOptions),
})
