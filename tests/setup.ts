import 'reflect-metadata'
import { config } from 'dotenv'
const result = config({ path: './env/test.env' })

if (result.error) {
  console.error('Env file for test environment not loaded', result.error)
  process.exit(1)
}
