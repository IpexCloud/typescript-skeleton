const loadEnv = (name: string): string => {
  const variable = process.env[name]
  if (variable === undefined) {
    console.log('Missing required env variable.')
    process.exit(1)
  }
  return variable
}

export const PORT = process.env.PORT || '3000'
export const DATABASE_URL = loadEnv('DATABASE_URL')
export const ENVIRONMENT_NAME = process.env.ENVIRONMENT_NAME || 'typescript-skeleton'
export const GRAPHQL_ENDPOINT = '/graphql'
