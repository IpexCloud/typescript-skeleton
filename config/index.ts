import { loadEnv } from '@/utils/helpers'

export const PORT = process.env.PORT || '3000'
export const DATABASE_URL = loadEnv('DATABASE_URL')
export const ENVIRONMENT_NAME = process.env.ENVIRONMENT_NAME || 'typescript-skeleton'
export const GRAPHQL_ENDPOINT = '/graphql'
