import { ValidationError } from 'class-validator'

export type ValidatorError = {
  errors: ValidationError[]
  message: string
  stack: string
  name: 'BadRequestError'
}
