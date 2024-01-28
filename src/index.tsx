import { generateStub } from '@server/server'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import reportWebVitals from './reportWebVitals'

generateStub().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  reportWebVitals()
})
