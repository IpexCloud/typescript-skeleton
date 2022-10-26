import * as jwt from 'jsonwebtoken'

export type AuthorizationType = 'basicAuth' | 'bearerToken'

export type AuthorizationStrategy = 'bearerToken'

export interface BasicAuthCredentials {
  username: string
  password: string
}

export interface PlatformJwtPayload extends jwt.JwtPayload {
  exp: number
  jti: string
  permissions: string[]
}

export type AuthenticationResult = SuccessAuthenticationResult | FailedAuthenticationResult

interface SuccessAuthenticationResult {
  valid: true
  user: User
}

interface FailedAuthenticationResult {
  valid: false
  error?: Error
}

export interface UserDetailResponse {
  id: string
  email: string
  firstName: string
  lastName: string
  customer: { id: number }
  services: {
    name: string
    type: string
    properties: {
      [key: string]: string | number | null
    }
  }[]
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  customer: { id: number }
  pbx?: {
    id: number
    hostname: string
    version: string
    configDatabase: { name: string; host: string }
    dataDatabase: { name: string; host: string }
  }
}
