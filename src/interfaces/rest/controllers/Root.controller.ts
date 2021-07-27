import { JsonController, Get, Res } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'
import { Response } from 'express'

import { version } from '~/package.json'
import { Databases } from '~/config/databases'
import { checkMaintenance, checkDatabaseConnection } from '@/utils/health'

@OpenAPI({ tags: ['/'] })
@JsonController()
export class RootController {
  @Get('/alive')
  @OpenAPI({ summary: 'Server alive status' })
  alive() {
    return {
      status: 'OK',
      uptime: Math.ceil(process.uptime()),
      version,
    }
  }

  @Get('/health')
  @OpenAPI({ summary: 'Server health status' })
  async health(@Res() response: Response) {
    let statusCode = 200
    const checks = (await Promise.all([checkMaintenance(), checkDatabaseConnection(Databases.database1)])).map(
      (check) => {
        if (check.statusCode === 503) {
          statusCode = 503
        }
        return check
      }
    )
    return response.status(statusCode).json(checks)
  }
}
