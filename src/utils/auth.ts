import * as jwt from 'jsonwebtoken'

enum AuthTypes {
  basicAuth = 'basicAuth',
  bearerToken = 'bearerToken',
  unknown = 'unknown'
}

export const getAuthType = (auth: string | undefined | null): AuthTypes => {
  if (!auth) return AuthTypes.unknown
  if (auth.startsWith('Basic') && auth.split(' ')) {
    const basicAuth = auth.split(' ')
    const [type, credentials] = basicAuth
    if (basicAuth.length === 2 && type === 'Basic' && credentials) return AuthTypes.basicAuth
    else return AuthTypes.unknown
  } else if (auth.startsWith('Bearer')) {
    const bearerAuth = auth.split(' ')
    const [type, token] = bearerAuth
    if (bearerAuth.length === 2 && type === 'Bearer' && token) return AuthTypes.bearerToken
    else return AuthTypes.unknown
  } else return AuthTypes.unknown
}

interface BasicAuthMeta {
  user: string
  password: string
}

export const getBasicAuthMeta = (auth: string): BasicAuthMeta | null => {
  if (getAuthType(auth) === 'basicAuth') {
    const [, credentials] = auth.split(' ')
    const decodedCredentials = Buffer.from(credentials, 'base64')
      .toString()
      .split(':')
    if (decodedCredentials.length === 2) {
      return {
        user: decodedCredentials[0],
        password: decodedCredentials[1]
      }
    } else return null
  } else return null
}

export const getBearerAuthMeta = (auth: string) => {
  if (getAuthType(auth) === 'bearerToken') {
    const [, token] = auth.split(' ')
    return jwt.decode(token)
  } else return null
}
