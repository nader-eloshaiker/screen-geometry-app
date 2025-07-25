import { DefaultEnvConfig } from '@/app/hooks/envconfig/EnvConfigContext'
import { EnvConfigProvider } from '@/app/hooks/envconfig/EnvConfigProvider'
import { createBrowserServiceWorker } from '@/lib/serviceworker/BrowserServiceWorker'
import { assetAxiosInstance, serverAxiosInstance } from '@screengeometry/lib-api/apiClient'
import { useGetConfig } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { ReactNode, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'

assetAxiosInstance.defaults.baseURL = window.location.origin

type Props = {
  children: ReactNode
  configReadyKey: string
  mockReadyKey: string
}

export const EnvironmentConfig = ({ children, configReadyKey, mockReadyKey }: Props) => {
  const { data, error, isFetched } = useGetConfig()
  const { setPageLoading } = usePageLoader()

  // Browser MSW is disabled when unit testing and so server is ready
  const [config, setConfig] = useState(DefaultEnvConfig.config)
  const [mockReady, setMockReady] = useState(import.meta.env.NODE_ENV === 'test')
  const [configReady, setConfigReady] = useState(false)

  useEffect(() => {
    if (error) {
      throw new Error('Could not render. Error fetching config data.')
    }
  }, [error])

  useEffect(() => {
    if (mockReady && configReady) {
      setPageLoading({ action: 'idle', componentId: configReadyKey })
    }
  })

  useEffect(() => {
    if (isFetched) {
      // was already initialised in App.tsx to 'loading'
      setConfigReady(true)
    }

    if (isFetched && !data) {
      throw new Error('Could not render. Error fetching config data.')
    }

    if (isFetched && data) {
      setConfig(data)
      serverAxiosInstance.defaults.baseURL = data.SERVER_API_URL
      ReactGA.initialize(data.GA_TRACKING_ID, { testMode: !!import.meta.env.DEV })

      if (!configReady) {
        createBrowserServiceWorker(data.SERVER_API_URL).then(() => {
          setMockReady(true)
        })
      }
    }
  }, [configReadyKey, data, isFetched, mockReadyKey, setPageLoading])

  return <EnvConfigProvider config={config}>{children}</EnvConfigProvider>
}
