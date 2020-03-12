import { createLogger, format, transports, LoggerOptions } from 'winston'
import { Request } from 'express'
import { logger } from 'express-winston'
import { hostname } from 'os'

import { version } from '~/package.json'
import { ENVIRONMENT_NAME } from '~/config'

interface LogFormat {
  '@timestamp': string
  '@version': string
  source: string
  host: string
  instanceId: string
  user: string | null
  correlationId: string | null
  forwardedFor: string | null
  severity: string
  route: string
  path: string
  responseTime: number
  statusCode: number
  method: string
  query: object
  authorization: string | null
  requestPayload?: object | null
  responsePayload?: object | null
}

const requestFormat = format.printf(data => {
  const { meta, level, timestamp } = data
  const auth = meta.req.headers.authorization || null
  // Get user from basic auth
  const basicAuth = auth && auth.split(' ')[1] && Buffer.from(auth.split(' ')[1], 'base64').toString()
  const userId = (basicAuth && basicAuth.split(':')[0]) || null

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
    query: meta.req.query,
    responseTime: meta.responseTime,
    route: meta.req.url,
    severity: level,
    source: ENVIRONMENT_NAME || 'typescript-skeleton',
    statusCode: meta.res.statusCode,
    user: userId
  }

  if (!(meta.res.statusCode >= 200 && meta.res.statusCode < 300)) {
    log = {
      ...log,
      requestPayload: meta.req.body ? meta.req.body : null,
      responsePayload: null
    }
  }

  return JSON.stringify(log)
})

const loggerOptions: LoggerOptions = {
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.timestamp(), requestFormat)
    })
  ]
}

export default logger({
  bodyBlacklist: ['password'], // omit this keys from logged body
  ignoreRoute: (req: Request) => {
    if (req.method === 'OPTIONS') return true
    if (req.url.startsWith('/documentation')) return true
    return false
  },
  ignoredRoutes: ['/health', '/alive', '/'],
  meta: true,
  requestWhitelist: ['headers', 'query', 'body', 'method', 'url'],
  responseWhitelist: ['body', 'statusCode'],
  winstonInstance: createLogger(loggerOptions)
})
