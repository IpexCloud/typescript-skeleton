import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { NextFunction, Response, Request } from 'express'
import { v4 as uuidv4 } from 'uuid'

@Middleware({ type: 'before' })
class CorrelationIdMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, _: Response, next: NextFunction): void {
    if (!request.headers['x-correlation-id']) {
      request.headers['x-correlation-id'] = uuidv4()
    }
    next()
  }
}

export default CorrelationIdMiddleware
