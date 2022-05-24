import { existsSync } from 'fs'
import { DataSource } from 'typeorm'

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

const checkDataSource = async (datasource: DataSource, name: string): Promise<ResponseFormat> => {
  const start = Date.now()
  const response = { ...DEFAULT_RESPONSE, name }
  try {
    await datasource.query('SHOW TABLES')
  } catch (err) {
    response.statusCode = 503
    response.message = err.message || err
  } finally {
    const end = Date.now()
    response.duration = end - start
  }
  return response
}

export { checkMaintenance, checkDataSource }
