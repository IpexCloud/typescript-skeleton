import { ExpressMiddlewareInterface } from 'routing-controllers'
import { NextFunction, Response } from 'express'

import { Request } from 'src/types'
import { getCorrelationId } from 'utils/helpers'
import { authChecker } from 'utils/auth/auth.checker'

class BearerTokenAuthMiddleware implements ExpressMiddlewareInterface {
  async use(request: Request, _: Response, next: NextFunction): Promise<void> {
    const correlationId = getCorrelationId(request.headers)
    const result = await authChecker.authenticate('bearerToken', { auth: request.headers.authorization, correlationId })

    if (!result.valid) {
      throw result.error
    }

    request.user = result.user
    next()
  }
}

export default BearerTokenAuthMiddleware
