import { createLogger, format, transports } from 'winston'

const messageFormat = format.printf(data => {
  const { timestamp, message } = data
  return `${timestamp} - ${message}`
})

export const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.splat(), format.timestamp(), messageFormat)
    })
  ]
})

export const setLoggerSilent = (silent: boolean) => {
  logger.transports.forEach(transport => {
    transport.silent = silent
  })
}
