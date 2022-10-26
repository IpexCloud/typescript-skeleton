import * as jwt from 'jsonwebtoken'
import * as jose from 'jose'

import env from '~/config'

const JWKS = jose.createRemoteJWKSet(env.platformAuth.url)

import type { AuthorizationType, BasicAuthCredentials, PlatformJwtPayload } from 'utils/auth/types'

const getAuthorizationType = (auth: string | undefined | null): AuthorizationType | undefined => {
  if (!auth || typeof auth !== 'string') {
    return undefined
  }

  if (auth.startsWith('Basic ')) {
    const basicAuth = auth.split(' ')
    const [type, credentials] = basicAuth
    if (basicAuth.length === 2 && type === 'Basic' && credentials) {
      return 'basicAuth'
    } else {
      return undefined
    }
  } else if (auth.startsWith('Bearer ')) {
    const bearerAuth = auth.split(' ')
    const [type, token] = bearerAuth
    if (bearerAuth.length === 2 && type === 'Bearer' && token) {
      return 'bearerToken'
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}

const getCredentialsFromBasicAuth = (auth: string): BasicAuthCredentials | undefined => {
  if (getAuthorizationType(auth) !== 'basicAuth') {
    return undefined
  }

  const [, credentials] = auth.split(' ')
  const decodedCredentials = Buffer.from(credentials, 'base64').toString().split(':')
  if (decodedCredentials.length !== 2) {
    return undefined
  }
  return {
    username: decodedCredentials[0],
    password: decodedCredentials[1]
  }
}

const getJwtPayload = (auth: string): PlatformJwtPayload | undefined => {
  if (getAuthorizationType(auth) !== 'bearerToken') {
    return undefined
  }

  const [, token] = auth.split(' ')
  const payload = jwt.decode(token)

  if (!payload || typeof payload === 'string') {
    return undefined
  }

  return { ...payload, permissions: payload.permissions || [] } as PlatformJwtPayload
}

const verifyToken = async (auth: string): Promise<PlatformJwtPayload | undefined> => {
  if (getAuthorizationType(auth) !== 'bearerToken') {
    return undefined
  }

  const [, token] = auth.split(' ')
  try {
    const payload = (await jose.jwtVerify(token, JWKS))?.payload

    if (!payload || typeof payload === 'string') {
      return undefined
    }

    return { ...payload, permissions: payload.permissions || [] } as PlatformJwtPayload
  } catch (error) {
    return undefined
  }
}

const isPastExpiration = (exp?: number) => {
  if (exp) {
    return new Date(exp * 1000) <= new Date()
  }

  return false
}

export { getAuthorizationType, getCredentialsFromBasicAuth, getJwtPayload, isPastExpiration, verifyToken }
