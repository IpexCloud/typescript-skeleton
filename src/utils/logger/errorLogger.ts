import { format, transports } from 'winston'
import { Response, Request } from 'express'
import { errorLogger, ErrorLoggerOptions } from 'express-winston'
import { hostname } from 'os'

import { version } from '~/package.json'
import { ENVIRONMENT_NAME } from '~/config'

interface ErrorLogFormat {
  '@timestamp': string
  '@version': string
  correlationId: string | null
  forwardedFor: string | null
  host: string
  instanceId: string
  msg: string
  severity: string
  source: string
  stack: string
}

const errorFormat = format.printf(data => {
  const { meta, level, timestamp } = data
  const log: ErrorLogFormat = {
    '@timestamp': timestamp,
    '@version': version,
    correlationId: meta.req.headers['x-correlation-id'] || meta.req.headers['x-amzn-trace-id'] || null,
    forwardedFor: meta.req.headers['x-forwarded-for'] ? meta.req.headers['x-forwarded-for'].split(',')[0] : null,
    host: hostname(),
    instanceId: hostname(),
    msg: meta.message,
    severity: level,
    source: ENVIRONMENT_NAME || 'typescript-skeleton',
    stack: meta.stack
  }
  return JSON.stringify(log)
})

const errorLoggerOptions: ErrorLoggerOptions = {
  meta: true,
  skip: (_: Request, res: Response) => {
    if (res.statusCode >= 500) return false // errors are logged only when status code is 500
    return true
  },
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.timestamp(), errorFormat)
    })
  ]
}

export default errorLogger(errorLoggerOptions)
