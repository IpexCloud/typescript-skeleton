import { createLogger, format, transports } from 'winston'
import { hostname } from 'os'

import { version } from '~/package.json'
import env from '~/config'

interface LogFormat {
  '@timestamp': string
  '@version': string
  source: string
  host: string
  instanceId: string
  user: string | null
  severity: string
  gqlOperation: string
  gqlName: string
  data: string
}

const messageFormat = format.printf(data => {
  const { timestamp, level, ...meta } = data

  const log: LogFormat = {
    '@timestamp': timestamp,
    '@version': version,
    host: hostname(),
    instanceId: hostname(),
    severity: level,
    source: env.logging.source,
    user: meta.context.id,
    gqlOperation: 'subscription',
    gqlName: meta.info.fieldName,
    data: JSON.stringify(meta.root)
  }

  return JSON.stringify(log)
})

const logger = createLogger({
  silent: env.logging.silent,
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.timestamp(), messageFormat)
    })
  ]
})

export default logger
