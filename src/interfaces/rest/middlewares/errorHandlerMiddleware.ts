import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers'
import { Response } from 'express'

import logRestError from '@/utils/logger/restErrorLogger'

@Middleware({ type: 'after' })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: Response) {
    const errorResponse = {
      errors: error.errors,
      message: error.message
    }

    // log error to stdout
    logRestError(error, request)

    switch (error.name) {
      case 'BadRequestError':
      case 'BadRequest':
        response.status(400)
        break
      case 'Unauthorized':
        response.status(401)
        break
      case 'NotFound':
        response.status(404)
        break
      case 'Forbidden':
        response.status(403)
        break
      case 'PreconditionFailed':
        response.status(412)
        break
      case 'Conflict':
        response.status(409)
        break

      default:
        response.status(500)
    }
    response.json(errorResponse)
  }
}
