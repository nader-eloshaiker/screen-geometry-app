import { generateStub } from '@server/server'
import { setupWorker } from 'msw/browser'
import { setupServer } from 'msw/node'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import reportWebVitals from './reportWebVitals'

const createServiceWorker = async () => {
  const { searchMocks, screenListMocks, screenMocks, passthroughMocks } = generateStub()

  if (import.meta.env.NODE_ENV) {
    const nodeServer = setupServer(...searchMocks(), ...screenListMocks(), ...screenMocks(), ...passthroughMocks())
    return await nodeServer.listen()
  } else {
    const webServer = setupWorker(...searchMocks(), ...screenListMocks(), ...screenMocks(), ...passthroughMocks())
    return await webServer.start()
  }
}

createServiceWorker().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  reportWebVitals()
})
