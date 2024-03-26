import { baseUrl } from '@contexts/Query/QueryClient'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserServiceWorker } from './service-worker/BrowserServiceWorker'

const testMode = !import.meta.env.DEV
const trackingId = process.env.GA_TRACKING_ID ?? import.meta.env.VITE_GA_TRACKING_ID
ReactGA.initialize(trackingId, { testMode })

createBrowserServiceWorker(baseUrl, !!import.meta.env.NODE_ENV).then(() => {
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
