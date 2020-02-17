import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { NextFunction, Response, Request } from 'express'
import * as uuidv4 from 'uuid/v4'

@Middleware({ type: 'before' })
export default class CorrelationIdMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, _: Response, next: NextFunction): void {
    if (!request.headers['x-correlation-id']) {
      request.headers['x-correlation-id'] = uuidv4()
    }
    next()
  }
}
