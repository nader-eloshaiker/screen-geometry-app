import { baseUrl } from '@/app/hooks/query/QueryClient'
import { createBrowserServiceWorker } from '@/lib/serviceworker/BrowserServiceWorker'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { onCLS, onINP, onLCP } from 'web-vitals/attribution'
import { App } from './app/App'
import { sendToGoogleAnalytics } from './configs/reportWebVitals'

import './index.css'

const testMode = !import.meta.env.DEV
const trackingId = process.env.GA_TRACKING_ID ?? import.meta.env.VITE_GA_TRACKING_ID
ReactGA.initialize(trackingId, { testMode })

const renderApp = () => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <HelmetProvider>
        <Helmet>
          <title>Screen Geometry</title>
          <meta name='description' content='Visually compare screen sizes and resolutions' />
        </Helmet>
        <App />
      </HelmetProvider>
    </StrictMode>
  )
}

if (import.meta.env.NODE_ENV !== 'test') {
  // load the service worker in the background to speed up page loads
  createBrowserServiceWorker(baseUrl).then(() => renderApp())
} else {
  console.log('Browser Service Worker not started due to unit testing env')
  renderApp()
}

onCLS(sendToGoogleAnalytics)
onINP(sendToGoogleAnalytics)
onLCP(sendToGoogleAnalytics)
