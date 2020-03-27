export class NotFoundError extends Error {
  message: string
  name: string
  constructor(message?: string) {
    super()
    this.message = message || 'Not found'
    this.name = 'Not found'
  }
}

export class UnauthorizedError extends Error {
  message: string
  name: string

  constructor(message?: string) {
    super()
    this.message = message || 'Unauthorized'
    this.name = 'Unauthorized'
  }
}

export class BadRequestError extends Error {
  message: string
  name: string

  constructor(message?: string) {
    super()
    this.message = message || 'Bad request'
    this.name = 'BadRequestError'
  }
}
