import { ExpressMiddlewareInterface } from 'routing-controllers'
import { NextFunction, Response } from 'express'

import { Request } from 'src/types'
import { authChecker } from 'utils/auth/auth.checker'
import { getCorrelationId } from 'utils/helpers'

class BearerTokenAuthMiddleware implements ExpressMiddlewareInterface {
  async use(request: Request, _: Response, next: NextFunction): Promise<void> {
    const result = await authChecker.authenticate('bearerToken', {
      authorization: request.headers.authorization,
      correlationId: getCorrelationId(request.headers)
    })

    if (!result.valid) {
      throw result.error
    }

    request.user = result.user
    next()
  }
}

export default BearerTokenAuthMiddleware
