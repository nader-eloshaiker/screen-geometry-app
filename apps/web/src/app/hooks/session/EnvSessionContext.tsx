import { createContext } from 'react'

export type JWTPayload = {
  'https://claims.screengeometry.com/profileId': string
  'https://claims.screengeometry.com/email': string
  'https://claims.screengeometry.com/name': string
}

export const DefaultSession = {
  session: {
    profileId: '',
    name: '',
    email: '',
  },
}
export type EnvSession = typeof DefaultSession
export type Session = typeof DefaultSession.session

export const EnvSessionContext = createContext<Session>(DefaultSession.session)
