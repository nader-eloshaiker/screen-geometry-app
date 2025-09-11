import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { onCLS, onINP, onLCP } from 'web-vitals/attribution'
import { App } from './app/App'
import { sendToGoogleAnalytics } from './configs/reportWebVitals'

import './index.css'

const packageVersion = import.meta.env.VITE_PACKAGE_VERSION
const buildDate = import.meta.env.VITE_BUILD_DATE

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <meta name='package-version' content={packageVersion} />
    <meta name='build-date' content={buildDate} />
    <App />
  </StrictMode>
)

onCLS(sendToGoogleAnalytics)
onINP(sendToGoogleAnalytics)
onLCP(sendToGoogleAnalytics)
