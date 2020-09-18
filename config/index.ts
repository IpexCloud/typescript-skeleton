import { config } from 'dotenv'

config({ path: './env/.env' })

export const PORT = process.env.PORT || '3000'
export const DATABASE = process.env.DATABASE
export const DATABASE_HOST = process.env.DATABASE_HOST
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
export const DATABASE_USER = process.env.DATABASE_USER
export const ENVIRONMENT_NAME = process.env.ENVIRONMENT_NAME
export const GRAPHQL_ENDPOINT = '/graphql'
export const GRAPHQL_PLAYGROUND_ENDPOINT = '/graphql-playground'
