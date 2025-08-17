import { DefaultSession, type JWTPayload, type Session } from '@/app/hooks/session/EnvSessionContext'
import { EnvSessionProvider } from '@/app/hooks/session/EnvSessionProvider'
import { mockAccessTokenResolver } from '@/app/hooks/session/EnvSessionTokenMock'
import { setAccessTokenResolver } from '@screengeometry/lib-api/apiClient'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { jwtDecode } from 'jwt-decode'
import { type ReactNode, useEffect, useState } from 'react'

const parseJwt = (jwtToken: string) => {
  try {
    const jwtPayload = jwtDecode<JWTPayload>(jwtToken)
    const claims: Session = {
      profileId: jwtPayload['https://claims.screengeometry.com/profileId'],
      email: jwtPayload['https://claims.screengeometry.com/email'],
      name: jwtPayload['https://claims.screengeometry.com/name'],
    }
    return claims
  } catch (_error) {
    // Note: must attempt to decode JWT first before regressing to the default value
    // this will only occur when running locally as token is either not valid or not present
    return DefaultSession.session
  }
}

type Props = {
  children: ReactNode
}

export const EnvironmentSessionLoaderKey = 'EnvironmentSessionLoader'

export const EnvSession = ({ children }: Props) => {
  const { setPageLoading } = usePageLoader()
  const [session, setSession] = useState<Session>(DefaultSession.session)

  useEffect(() => {
    if (mockAccessTokenResolver && setPageLoading) {
      setPageLoading({ action: 'loading', componentId: EnvironmentSessionLoaderKey })
      setAccessTokenResolver(mockAccessTokenResolver)
      mockAccessTokenResolver().then((data) => {
        const claims = parseJwt(data)
        setSession(claims)
        setPageLoading({ action: 'idle', componentId: EnvironmentSessionLoaderKey })
      })
    }
  }, [setPageLoading])

  return <EnvSessionProvider session={session}>{children}</EnvSessionProvider>
}
