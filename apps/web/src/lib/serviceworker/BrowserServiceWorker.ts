import { generateStub } from '@screengeometry/server'
import { initDB } from '@screengeometry/server/indexedDB'
import { setupWorker } from 'msw/browser'

export const createBrowserServiceWorker = async (baseUrl: string) => {
  console.log('Browser Service Worker started in test mode')

  await initDB()
  const { searchMocks, screenListMocks, screenMocks, passthroughMocks } = generateStub(baseUrl)

  const webServer = setupWorker(...searchMocks(), ...screenListMocks(), ...screenMocks(), ...passthroughMocks())
  const worker = await webServer.start({ onUnhandledRequest: 'bypass' })

  return worker
}
