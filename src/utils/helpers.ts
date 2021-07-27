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

const loadEnv = (name: string): string => {
  const variable = process.env[name]
  if (variable === undefined) {
    console.log('Missing required env variable: ' + name)
    process.exit(1)
  }
  return variable
}

export { getStatusCodeFromError, loadEnv }
