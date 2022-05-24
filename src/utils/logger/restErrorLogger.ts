import { createLogger, format, transports } from 'winston'
import { hostname } from 'os'
import { Request } from 'express'

import { version } from '~/package.json'
import { ENVIRONMENT_NAME } from '~/config'
import { ValidatorError } from '@/types'

interface ErrorLogFormat {
  '@timestamp': string
  '@version': string
  correlationId: string | string[] | null
  forwardedFor: string | null
  host: string
  instanceId: string
  msg: string
  severity: string
  source: string
  stack?: string
}

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.printf(data => data.message)
    })
  ]
})

const logRestError = (error: ValidatorError | Error, request: Request) => {
  const errorLog: ErrorLogFormat = {
    '@timestamp': new Date().toISOString(),
    '@version': version,
    correlationId: request.headers['x-correlation-id'] || request.headers['x-amzn-trace-id'] || null,
    forwardedFor:
      request.headers['x-forwarded-for'] && !Array.isArray(request.headers['x-forwarded-for'])
        ? request.headers['x-forwarded-for'].split(',')[0]
        : null,
    host: hostname(),
    instanceId: hostname(),
    msg: error.message,
    severity: 'error',
    source: ENVIRONMENT_NAME,
    stack: error.stack
  }

  logger.log({
    level: 'error',
    message: JSON.stringify(errorLog)
  })
}

export default logRestError
