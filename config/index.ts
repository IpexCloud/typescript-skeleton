const loadEnv = (name: string): string => {
  const variable = process.env[name]
  if (variable === undefined) {
    console.log('Missing required env variable.')
    process.exit(1)
  }
  return variable
}

export const PORT = process.env.PORT || '3000'
export const DATABASE = loadEnv('DATABASE')
export const DATABASE_HOST = loadEnv('DATABASE_HOST')
export const DATABASE_PASSWORD = loadEnv('DATABASE_PASSWORD')
export const DATABASE_USER = loadEnv('DATABASE_USER')
export const ENVIRONMENT_NAME = process.env.ENVIRONMENT_NAME || 'typescript-skeleton'
export const GRAPHQL_ENDPOINT = '/graphql'
