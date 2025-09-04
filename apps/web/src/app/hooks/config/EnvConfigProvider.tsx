import { createBrowserServiceWorker } from '@/lib/serviceworker/BrowserServiceWorker'
import { assetAxiosInstance, serverAxiosInstance } from '@screengeometry/lib-api/apiClient'
import { type Config, getGetConfigResponseMock, useGetConfig } from '@screengeometry/lib-api/spec'
import { usePageLoader } from '@screengeometry/lib-ui/pageloader'
import { type ReactNode, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { EnvConfigContext } from './EnvConfigContext'

assetAxiosInstance.defaults.baseURL = window.location.origin

type Props = {
  children: ReactNode
  configReadyKey: string
}

const isDevEnv = !!import.meta.env.DEV
const isTesting = import.meta.env.NODE_ENV === 'test'

export const EnvConfigProvider = ({ children, configReadyKey }: Props) => {
  const { data, error, isFetched } = useGetConfig()
  const { setComponentLoading } = usePageLoader()

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
      setComponentLoading({ action: 'idle', componentId: configReadyKey })
    }
  }, [config, configReadyKey, mockReady, setComponentLoading])

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
  return <EnvConfigContext.Provider value={config}>{children}</EnvConfigContext.Provider>
}
