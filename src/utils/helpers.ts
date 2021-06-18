import { config } from 'dotenv'

const getStatusCodeFromError = (error: { name: string }) => {
  switch (error.name) {
    case 'BadRequestError':
    case 'BadRequest':
    case 'SyntaxError':
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

const loadEnv = () => {
  if (['local'].includes(process.env.NODE_ENV || '')) {
    const result = config({ path: './env/.env' })
    if (result.error) {
      console.log('Missing .env file in ${workspaceFolder}/env for local development')
      process.exit(1)
    }
  }
}

const loadEnvVariable = (name: string): string => {
  const variable = process.env[name]
  if (variable === undefined) {
    console.log('Missing required env variable: ' + name)
    process.exit(1)
  }
  return variable
}

export { getStatusCodeFromError, loadEnv, loadEnvVariable }
