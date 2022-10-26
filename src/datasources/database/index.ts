import { DataSource } from 'typeorm'

import env from '~/config'

const AppDataSource = new DataSource(env.database)

export default AppDataSource
