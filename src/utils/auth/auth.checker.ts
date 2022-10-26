import axios from 'axios'
import { MemoryCache } from 'cache-manager'
import Debug from 'debug'

import type { AuthorizationStrategy, UserDetailResponse, AuthenticationResult, User } from 'utils/auth/types'
import { verifyToken, getAuthorizationType, isPastExpiration } from 'utils/auth/helpers'
import { UnauthorizedError } from 'entities/errors'
import env from '~/config'

let authChecker: AuthChecker

class AuthChecker {
  private debug = Debug('auth.checker')
  private centralApiInstance = axios.create({ baseURL: env.api.central, timeout: 10000 })

  constructor(private cache: MemoryCache) {}

  private transformUserDetailResponse(response: UserDetailResponse): User {
    const pbxService = response.services.find(service => service.type === 'pbx')
    const pbx = pbxService && {
      id: pbxService.properties!.pbxId as number,
      hostname: pbxService.properties.hostname as string,
      version: pbxService.properties.version as string,
      configDatabase: { name: `ipbxdb_${pbxService.properties.pbxId}`, host: pbxService.properties.dbHost as string },
      dataDatabase: { name: `pbxdata_${pbxService.properties.pbxId}`, host: pbxService.properties.dbDataHost as string }
    }

    return {
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      customer: { id: response.customer.id },
      pbx
    }
  }

  private async fetchUserDetail({ token, correlationId }: { token: string; correlationId?: string }): Promise<User> {
    this.debug('Fetching user detail')
    const response = await this.centralApiInstance.request<UserDetailResponse>({
      method: 'get',
      url: '/v1/users/me',
      headers: { authorization: token, 'x-correlation-id': correlationId }
    })
    return this.transformUserDetailResponse(response.data)
  }

  private async authenticateBearerToken({
    auth,
    correlationId
  }: {
    auth: string
    correlationId?: string
  }): Promise<AuthenticationResult> {
    const type = getAuthorizationType(auth)

    if (type !== 'bearerToken') {
      return { valid: false, error: new UnauthorizedError('Invalid authorization type') }
    }

    const payload = await verifyToken(auth)

    if (!payload) {
      return { valid: false, error: new UnauthorizedError('Invalid token') }
    }

    if (isPastExpiration(payload.exp)) {
      return { valid: false, error: new UnauthorizedError('Expired token') }
    }

    console.log('x', payload.exp * 1000 - Date.now())
    try {
      const user = await this.cache.wrap(
        payload.jti,
        () => this.fetchUserDetail({ token: auth, correlationId }),
        payload.exp * 1000 - Date.now()
      )
      this.debug('User successfully authorized')
      return { valid: true, user }
    } catch (error) {
      return { valid: false, error: new UnauthorizedError('Error by fetching user detail - ' + error.message) }
    }
  }

  async authenticate(
    strategy: AuthorizationStrategy,
    { auth, correlationId }: { auth?: string; correlationId?: string }
  ): Promise<AuthenticationResult> {
    if (!auth) {
      return { valid: false, error: new UnauthorizedError('Missing authorization') }
    }

    this.debug('Start authentication')
    switch (strategy) {
      case 'bearerToken':
      default: {
        return this.authenticateBearerToken({ auth, correlationId })
      }
    }
  }
}

const initAuthChecker = (cache: MemoryCache) => {
  authChecker = new AuthChecker(cache)
  return authChecker
}

export { initAuthChecker, authChecker }
export type { AuthChecker }
