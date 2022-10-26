import { IncomingHttpHeaders } from 'http'

const getStatusCodeFromError = (error: { name: string }) => {
  switch (error.name) {
    case 'BadRequestError':
    case 'BadRequest':
    case 'SyntaxError':
    case 'ParameterParseJsonError':
      return 400
    case 'Unauthorized':
      return 401
    case 'NotFound':
      return 404
    case 'Forbidden':
      return 403
    case 'PreconditionFailed':
      return 412
    case 'Conflict':
      return 409

    default:
      return 500
  }
}

const getCorrelationId = (headers: IncomingHttpHeaders = {}) => {
  const header = headers['x-correlation-id']
  return header && Array.isArray(header) ? header.pop() : header
}

export { getStatusCodeFromError, getCorrelationId }
