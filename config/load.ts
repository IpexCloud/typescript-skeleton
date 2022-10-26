import { resolve } from 'path'
import { config } from 'dotenv'
import { cleanEnv } from 'envalid'

import EnvValidatorSchema from '~/env/env.schema'

let env: ReturnType<typeof validateEnv>

const loadConfig = (path?: string) => {
  const envFilePath = resolve(path || './env/.env')
  console.log(`Loading env variables from ${envFilePath}`)
  config({ path: envFilePath })
  validateEnv()
}

const validateEnv = () => {
  const output = cleanEnv(process.env, EnvValidatorSchema, {
    reporter: ({ errors, env }) => {
      if (Object.keys(errors).length) {
        console.log(`Invalid or missing env variables: ${Object.keys(errors)}`)
        const { IGNORE_ENV_VALIDATION } = env as { IGNORE_ENV_VALIDATION: boolean }
        if (!IGNORE_ENV_VALIDATION) {
          process.exit(1)
        }
      }
    }
  })

  env = output
  return output
}

export { loadConfig, env }
