import { ValidationError } from 'class-validator'
import { Request as ExpressRequest } from 'express'

import { User } from 'utils/auth/types'

export interface Request extends ExpressRequest {
  user: User
}

export type ValidatorError = {
  errors: ValidationError[]
  message: string
  stack: string
  name: 'BadRequestError'
}
