import { DefaultSession, JWTPayload, Session } from '@/app/hooks/envsession/EnvSessionContext'
import { EnvSessionProvider } from '@/app/hooks/envsession/EnvSessionProvider'
import { mockAccessTokenResolver } from '@/app/hooks/envsession/EnvSessionTokenMock'
import { assetAxiosInstance, setAccessTokenResolver } from '@screengeometry/lib-api/apiClient'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { jwtDecode } from 'jwt-decode'
import { ReactNode, useEffect, useState } from 'react'

assetAxiosInstance.defaults.baseURL = window.location.origin

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

export const EnvironmentSession = ({ children }: Props) => {
  const { setPageLoading } = usePageLoader()
  const [session, setSession] = useState<Session>(DefaultSession.session)

  useEffect(() => {
    if (mockAccessTokenResolver && setPageLoading) {
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
