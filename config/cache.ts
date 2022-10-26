import { caching, MemoryCache } from 'cache-manager'

import config from '~/config'

let cache: MemoryCache

const initCache = async () => {
  cache = await caching('memory', config.cache)
  return cache
}

export { cache, initCache }
