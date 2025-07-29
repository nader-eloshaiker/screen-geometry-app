import { EnvConfigProvider } from '@/app/hooks/config/EnvConfigProvider'
import { createBrowserServiceWorker } from '@/lib/serviceworker/BrowserServiceWorker'
import { assetAxiosInstance, serverAxiosInstance } from '@screengeometry/lib-api/apiClient'
import { Config, getGetConfigResponseMock, useGetConfig } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/hooks/pageloader'
import { ReactNode, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'

assetAxiosInstance.defaults.baseURL = window.location.origin

type Props = {
  children: ReactNode
  configReadyKey: string
}

const isDevEnv = !!import.meta.env.DEV
const isTesting = import.meta.env.NODE_ENV === 'test'

export const EnvConfig = ({ children, configReadyKey }: Props) => {
  const { data, error, isFetched } = useGetConfig()
  const { setPageLoading } = usePageLoader()

  // Node MSW already running in unit tests
  const [mockReady, setMockReady] = useState(isTesting)
  const [config, setConfig] = useState<Config>()

  useEffect(() => {
    if (error) {
      setConfig(getGetConfigResponseMock())
      throw new Error('Could not render. Error fetching config data.')
    }
  }, [error])

  useEffect(() => {
    if (mockReady && config) {
      setPageLoading({ action: 'idle', componentId: configReadyKey })
    }
  }, [config, configReadyKey, mockReady, setPageLoading])

  useEffect(() => {
    if (isFetched && !data) {
      setConfig(getGetConfigResponseMock())
      throw new Error('Could not render. Error fetching config data.')
    }

    if (isFetched && data) {
      setConfig(data)
    }
  }, [data, isFetched])

  useEffect(() => {
    if (!config) return

    serverAxiosInstance.defaults.baseURL = config.SERVER_API_URL
    ReactGA.initialize(config.GA_TRACKING_ID, { testMode: isDevEnv })

    if (!isTesting) {
      // Start the Browser Service Worker
      createBrowserServiceWorker(config.SERVER_API_URL).then(() => {
        setMockReady(true)
      })
    }
  }, [config])

  return <EnvConfigProvider config={config}>{children}</EnvConfigProvider>
}
