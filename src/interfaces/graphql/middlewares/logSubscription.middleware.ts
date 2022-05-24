import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'

import subscriptionLogger from 'utils/logger/subscriptionLogger'

class LogSubscription implements MiddlewareInterface {
  async use(resolverData: ResolverData, next: NextFn) {
    if (resolverData.info.operation.operation === 'subscription') {
      subscriptionLogger.info('subscription', resolverData)
    }
    return next()
  }
}

export default LogSubscription
