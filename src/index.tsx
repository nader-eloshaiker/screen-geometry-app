import { generateStub } from '@server/server'
import { setupWorker } from 'msw/browser'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { App } from './App'
import reportWebVitals from './reportWebVitals'

ReactGA.initialize('G-LPQCBDMC1D')

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
