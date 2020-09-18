import { createLogger, format, transports } from 'winston'

const messageFormat = format.printf(data => {
  const { timestamp, message } = data
  return `${timestamp} - ${message}`
})

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.timestamp(), messageFormat)
    })
  ]
})

const setLoggerSilent = (silent: boolean) => {
  logger.transports.forEach(transport => {
    transport.silent = silent
  })
}

export { logger, setLoggerSilent }
