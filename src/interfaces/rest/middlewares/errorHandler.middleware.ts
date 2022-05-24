import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers'
import { Response, Request } from 'express'
import { ValidationError } from 'class-validator'

import logRestError from 'utils/logger/restErrorLogger'
import { getStatusCodeFromError } from 'utils/helpers'
import { ValidatorError } from 'src/types'

type ErrorResponse = {
  message: string
  errors?: ValidationError[]
}

@Middleware({ type: 'after' })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: ValidatorError | Error, request: Request, response: Response) {
    const errorResponse: ErrorResponse = {
      message: error.message
    }

    if ('errors' in error) {
      errorResponse.errors = error.errors
    }

    // log error to stdout
    logRestError(error, request)

    const statusCode = getStatusCodeFromError(error)
    response.status(statusCode).json(errorResponse)
  }
}
