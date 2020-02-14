import * as expressWinston from 'express-winston'
import { createLogger, format, transports } from 'winston';

// import { format as  transformData} from './requestBody';

const transformData = format((info, opts) => {
  console.log(opts)
  return info
})

const loggerOptions = {
  meta: true,
  defaultMeta: {
    application: 'application-xxx',
    organization: 'organization-xxx',
    product: "pbx",
    version: 'sadas'
  },
  // msg:
  //   '[express-xx] {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
  transports: [
    new transports.Console({
      format: format.combine(
        format((info, opts) => {
          console.log(opts)
          return info
        })(),
        format.timestamp(),
        format.json()
      ),
    }),
  ],
  ignoredRoutes: ['documentation']
};


//
// const customData = (data) => {
//   return data
// }

const errorLoggerOptions = {
  baseMeta: {
    application: 'application-xxx',
    organization: 'organization-xxx',
    product: "pbx",
    version: 'sadas'
  },
  transports: [
    new transports.Console({
    })
  ],
  format: format.combine(
    transformData(),
    format.json()
  )
}

const logger = createLogger(loggerOptions);
const setLoggerSilent = (silent: boolean) => {
  logger.transports.forEach(transport => {
    transport.silent = silent;
  });
};
export { logger, setLoggerSilent };
export const requestLogger = expressWinston.logger(loggerOptions);
export const errorLogger = expressWinston.errorLogger(errorLoggerOptions);
