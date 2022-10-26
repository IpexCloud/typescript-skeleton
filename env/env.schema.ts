import { str, bool, port, url } from 'envalid'

export default {
  PORT: port({ default: 8080 }),
  ENVIRONMENT_NAME: str({ default: 'typescript-skeleton' }),
  NODE_ENV: str({ choices: ['development', 'production'] }),
  APP_ENV: str({ choices: ['development', 'test', 'beta', 'production'] }),
  DATABASE_URL: url({ example: 'mysql://{user}:{password}@{host}:{port}/{name}' }),
  IGNORE_ENV_VALIDATION: bool({ default: false }),
  LOGGER_SILENT: bool({ default: false }),
  CENTRAL_API_BASE_URL: url({ example: 'https://url.com' }),
  KEYCLOAK_BASE_URL: url(),
  KEYCLOAK_REALM: str({ default: 'IPEX' })
}
