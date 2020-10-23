class NotFoundError extends Error {
  message = 'Not found'
  name = 'NotFound'
  constructor(message?: string) {
    super()
    if (message) {
      this.message = message
    }
  }
}

class UnauthorizedError extends Error {
  message = 'Unauthorized'
  name = 'Unauthorized'

  constructor(message?: string) {
    super()
    if (message) {
      this.message = message
    }
  }
}

class BadRequestError extends Error {
  message = 'Bad request'
  name = 'BadRequest'

  constructor(message?: string) {
    super()
    if (message) {
      this.message = message
    }
  }
}

class ForbiddenError extends Error {
  message = 'Forbidden'
  name = 'Forbidden'

  constructor(message?: string) {
    super()
    if (message) {
      this.message = message
    }
  }
}

class PreconditionFailedError extends Error {
  message = 'Precondition failed'
  name = 'PreconditionFailed'

  constructor(message?: string) {
    super()
    if (message) {
      this.message = message
    }
  }
}

class ConflictError extends Error {
  message = 'Conflict'
  name = 'Conflict'

  constructor(message?: string) {
    super()
    if (message) {
      this.message = message
    }
  }
}

export { NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError, PreconditionFailedError, ConflictError }
