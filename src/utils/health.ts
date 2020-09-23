import { existsSync } from 'fs'
import { getConnection } from 'typeorm'

import { Connections } from '~/config/databases'

interface ResponseFormat {
  duration: number
  message: string
  name: string
  statusCode: number
}

const DEFAULT_RESPONSE = {
  duration: 0,
  message: 'OK',
  name: 'maintenance',
  statusCode: 200
}

const checkMaintenance = async (): Promise<ResponseFormat> => {
  const start = Date.now()
  const response = { ...DEFAULT_RESPONSE, name: 'maintenance' }
  if (existsSync('maintenance')) {
    response.statusCode = 423
    response.message = 'maintenance'
  }
  const end = Date.now()
  response.duration = end - start
  return response
}

const checkDatabaseConnection = async (name: Connections): Promise<ResponseFormat> => {
  const start = Date.now()
  const response = { ...DEFAULT_RESPONSE, name }
  try {
    await getConnection(name).query('SHOW TABLES')
  } catch (err) {
    response.statusCode = 503
    response.message = err.message || err
  } finally {
    const end = Date.now()
    response.duration = end - start
  }
  return response
}

export { checkMaintenance, checkDatabaseConnection }
