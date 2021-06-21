import { JsonController, Get } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'

import { version } from '~/package.json'
import { Databases } from '~/config/databases'
import { checkMaintenance, checkDatabaseConnection } from 'utils/health'

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
  async health() {
    return [await checkMaintenance(), await checkDatabaseConnection(Databases.database1)]
  }
}
