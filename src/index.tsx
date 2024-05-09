import { baseUrl } from '@app/contexts/Query/QueryClient'
import { createBrowserServiceWorker } from '@packages/serviceworker/BrowserServiceWorker'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { App } from './app/App'
import reportWebVitals from './configs/reportWebVitals'

const testMode = !import.meta.env.DEV
const trackingId = process.env.GA_TRACKING_ID ?? import.meta.env.VITE_GA_TRACKING_ID
ReactGA.initialize(trackingId, { testMode })

createBrowserServiceWorker(baseUrl, !!import.meta.env.NODE_ENV).then(() => {})
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
