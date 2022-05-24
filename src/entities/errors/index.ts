import { ValidatorError } from 'src/types'

class HttpException extends Error {
  message: string
  name: string
  error?: string
  property?: string
  constructor(message?: string, detail?: { error?: string; property?: string }) {
    super()
    this.message = message ? message : 'Unknown'
    this.error = detail?.error && detail.error
    this.property = detail?.property && detail.property
  }
}

class NotFoundError extends HttpException {
  name = 'NotFound'
  constructor(message?: string, detail?: { error?: string; property?: string }) {
    super()
    this.message = message ? message : 'Not found'
    this.error = detail?.error && detail.error
    this.property = detail?.property && detail.property
  }
}

class UnauthorizedError extends HttpException {
  name = 'Unauthorized'

  constructor(message?: string, detail?: { error?: string; property?: string }) {
    super()
    this.message = message ? message : 'Unauthorized'
    this.error = detail?.error && detail.error
    this.property = detail?.property && detail.property
  }
}

class BadRequestError extends HttpException {
  name = 'BadRequest'
  errors: ValidatorError[]

  constructor(message?: string, detail?: { error?: string; property?: string }, errors?: ValidatorError[]) {
    super()
    this.message = message ? message : 'Bad request'
    this.error = detail?.error && detail.error
    this.property = detail?.property && detail.property
    if (errors?.length) {
      this.errors = errors
    }
  }
}

class ForbiddenError extends HttpException {
  name = 'Forbidden'
  constructor(message?: string, detail?: { error?: string; property?: string }) {
    super()
    this.message = message ? message : 'Forbidden'
    this.error = detail?.error && detail.error
    this.property = detail?.property && detail.property
  }
}

class PreconditionFailedError extends HttpException {
  name = 'PreconditionFailed'
  constructor(message?: string, detail?: { error?: string; property?: string }) {
    super()
    this.message = message ? message : 'Precondition failed'
    this.error = detail?.error && detail.error
    this.property = detail?.property && detail.property
  }
}

class ConflictError extends HttpException {
  name = 'Conflict'
  constructor(message?: string, detail?: { error?: string; property?: string }) {
    super()
    this.message = message ? message : 'Conflict'
    this.error = detail?.error && detail.error
    this.property = detail?.property && detail.property
  }
}

export { NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError, PreconditionFailedError, ConflictError }
