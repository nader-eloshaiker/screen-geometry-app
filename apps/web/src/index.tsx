import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { onCLS, onINP, onLCP } from 'web-vitals/attribution'
import { App } from './app/App'
import { sendToGoogleAnalytics } from './configs/reportWebVitals'

import '@screengeometry/lib-style/theme.css'

const packageVersion = import.meta.env.VITE_PACKAGE_VERSION
const buildDate = import.meta.env.VITE_BUILD_DATE

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Screen Geometry</title>
        <meta name='description' content='Visually compare multiple monitor sizes and resolutions simultaneously' />
        <meta name='package-version' content={packageVersion} />
        <meta name='build-date' content={buildDate} />
      </Helmet>
      <App />
    </HelmetProvider>
  </StrictMode>
)

onCLS(sendToGoogleAnalytics)
onINP(sendToGoogleAnalytics)
onLCP(sendToGoogleAnalytics)
