import * as jwt from 'jsonwebtoken'
import * as jose from 'jose'
import axios from 'axios'

import env from '~/config'

const JWKS = jose.createRemoteJWKSet(env.platformAuth.url)

import type {
  AuthorizationType,
  BasicAuthCredentials,
  PlatformJwtPayload,
  User,
  UserDetailResponse
} from 'utils/auth/types'

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

const transformUserDetailResponse = (response: UserDetailResponse): User => {
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

const fetchUserDetail = async ({ token, correlationId }: { token: string; correlationId?: string }): Promise<User> => {
  const response = await axios.request<UserDetailResponse>({
    baseURL: env.api.central,
    timeout: 10000,
    method: 'get',
    url: '/v1/users/me',
    headers: { authorization: token, 'x-correlation-id': correlationId }
  })
  return transformUserDetailResponse(response.data)
}

export {
  getAuthorizationType,
  getCredentialsFromBasicAuth,
  getJwtPayload,
  isPastExpiration,
  verifyToken,
  fetchUserDetail
}
