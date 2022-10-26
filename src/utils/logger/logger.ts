import { createLogger, format, transports } from 'winston'
import { hostname } from 'os'

import { version } from '~/package.json'
import env from '~/config'

const messageFormat = format.printf(log => {
  const { timestamp, level, message, data, ...meta } = log
  const resultLog = {
    '@timestamp': timestamp,
    severity: level,
    msg: message,
    data: data ? JSON.stringify(data) : undefined,
    ...meta
  }
  return JSON.stringify(resultLog)
})

const logger = createLogger({
  silent: env.logging.silent,
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.timestamp(), messageFormat)
    })
  ],
  defaultMeta: {
    host: hostname(),
    instanceId: hostname(),
    source: env.logging.source,
    '@version': version
  }
})

export default logger
