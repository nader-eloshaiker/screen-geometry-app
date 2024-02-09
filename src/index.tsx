import { generateStub } from '@server/server'
import { setupWorker } from 'msw/browser'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { App } from './App'
import reportWebVitals from './reportWebVitals'

const testMode = !import.meta.env.DEV
const trackingId = process.env.GA_TRACKING_ID ?? import.meta.env.VITE_GA_TRACKING_ID
ReactGA.initialize(trackingId, { testMode })

const createServiceWorker = async () => {
  const { searchMocks, screenListMocks, screenMocks, passthroughMocks } = generateStub()

  if (import.meta.env.NODE_ENV) {
    return Promise.resolve()
  }

  const webServer = setupWorker(...searchMocks(), ...screenListMocks(), ...screenMocks(), ...passthroughMocks())
  return await webServer.start()
}

createServiceWorker().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <HelmetProvider>
        <Helmet>
          <title>Screen Geometry</title>
        </Helmet>
        <App />
      </HelmetProvider>
    </StrictMode>,
  )

  reportWebVitals()
})
