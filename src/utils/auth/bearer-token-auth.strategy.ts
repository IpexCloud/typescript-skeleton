import { MemoryCache } from 'cache-manager'

import type { AuthenticationInput, AuthenticationResult, Strategy } from 'utils/auth/types'
import { verifyToken, getAuthorizationType, isPastExpiration, fetchUserDetail } from 'utils/auth/helpers'
import { UnauthorizedError } from 'entities/errors'

class BearerTokenAuthStrategy implements Strategy {
  constructor(private cache: MemoryCache) {}

  async authenticate(input: AuthenticationInput): Promise<AuthenticationResult> {
    const authorization = input.authorization

    if (!authorization) {
      return { valid: false, error: new UnauthorizedError('Missing authorization') }
    }

    const type = getAuthorizationType(authorization)

    if (type !== 'bearerToken') {
      return { valid: false, error: new UnauthorizedError('Invalid authorization type') }
    }

    const payload = await verifyToken(authorization)

    if (!payload) {
      return { valid: false, error: new UnauthorizedError('Invalid token') }
    }

    if (isPastExpiration(payload.exp)) {
      return { valid: false, error: new UnauthorizedError('Expired token') }
    }

    try {
      const user = await this.cache.wrap(
        payload.jti,
        () => fetchUserDetail({ token: authorization, correlationId: input.correlationId }),
        payload.exp * 1000 - Date.now()
      )
      return { valid: true, user }
    } catch (error) {
      return { valid: false, error: new UnauthorizedError('Error by fetching user detail - ' + error.message) }
    }
  }
}

export { BearerTokenAuthStrategy }
