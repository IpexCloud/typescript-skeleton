import Debug from 'debug'

import type { AuthorizationStrategy, AuthenticationResult, Strategy, AuthenticationInput } from 'utils/auth/types'
import { UnauthorizedError } from 'entities/errors'
let authChecker: AuthChecker

class AuthChecker {
  private debug = Debug('auth.checker')
  private strategies: Record<AuthorizationStrategy, Strategy>

  use(name: AuthorizationStrategy, strategy: Strategy) {
    this.strategies = { ...this.strategies, [name]: strategy }
  }

  async authenticate(strategy: AuthorizationStrategy, input: AuthenticationInput): Promise<AuthenticationResult> {
    this.debug('Start authentication')

    if (!this.strategies[strategy]) {
      return { valid: false, error: new UnauthorizedError('Invalid authentication strategy') }
    }

    return this.strategies[strategy].authenticate(input)
  }
}

const initAuthChecker = () => {
  authChecker = new AuthChecker()
  return authChecker
}

export { initAuthChecker, authChecker }
export type { AuthChecker }
