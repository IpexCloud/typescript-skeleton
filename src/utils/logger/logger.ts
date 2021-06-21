import { createLogger, format, transports } from 'winston'
import { hostname } from 'os'

import { version } from '~/package.json'
import { ENVIRONMENT_NAME } from '~/config'

const messageFormat = format.printf((data) => {
  const { timestamp, level, message, ...meta } = data
  const log = {
    '@timestamp': timestamp,
    severity: level,
    msg: message,
    ...meta,
  }
  return JSON.stringify(log)
})

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.timestamp(), messageFormat),
    }),
  ],
  defaultMeta: {
    host: hostname(),
    instanceId: hostname(),
    source: ENVIRONMENT_NAME,
    '@version': version,
  },
})

export default logger
