import { DefaultEnvConfig } from '@/app/hooks/envconfig/EnvConfigContext'
import { EnvConfigProvider } from '@/app/hooks/envconfig/EnvConfigProvider'
import { createBrowserServiceWorker } from '@/lib/serviceworker/BrowserServiceWorker'
import { assetAxiosInstance, serverAxiosInstance } from '@screengeometry/lib-api/apiClient'
import { useGetConfig } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { PageLoader } from '@screengeometry/lib-ui/pageloader'
import { ReactNode, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'

export const EnvironmentConfigLoaderKey = 'EnvironmentConfigLoader'
export const MockServerReadyKey = 'MockServerReady'

assetAxiosInstance.defaults.baseURL = window.location.origin

type Props = {
  children: ReactNode
}

export const EnvironmentConfig = ({ children }: Props) => {
  const { data, error, isFetched } = useGetConfig()
  const { isPageLoading, setPageLoading } = usePageLoader()

  // Browser MSW is disabled when unit testing and so server is ready
  const [isServerReady, setIsServerReady] = useState(import.meta.env.NODE_ENV === 'test')
  const [config, setConfig] = useState(DefaultEnvConfig.config)

  useEffect(() => {
    if (error) {
      throw new Error('Could not render. Error fetching config data.')
    }
  }, [error])

  useEffect(() => {
    if (isFetched) {
      // was already initialised in App.tsx to 'loading'
      setPageLoading({ action: 'idle', componentId: EnvironmentConfigLoaderKey })
    }

    if (isFetched && !data) {
      throw new Error('Could not render. Error fetching config data.')
    }

    if (isFetched && data) {
      setConfig(data)
      serverAxiosInstance.defaults.baseURL = data.SERVER_API_URL
      ReactGA.initialize(data.GA_TRACKING_ID, { testMode: !!import.meta.env.DEV })

      if (import.meta.env.NODE_ENV !== 'test') {
        createBrowserServiceWorker(data.SERVER_API_URL).then(() => {
          setIsServerReady(true)

          setPageLoading({ action: 'idle', componentId: MockServerReadyKey })
        })
      } else {
        setPageLoading({ action: 'idle', componentId: MockServerReadyKey })
      }
    }
  }, [data, isFetched, setPageLoading])

  return (
    <EnvConfigProvider config={config}>
      {isPageLoading && isServerReady ? <PageLoader message='Loading Config ...' /> : children}
    </EnvConfigProvider>
  )
}
