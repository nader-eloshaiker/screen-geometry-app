import { initDB } from '@packages/server/db/IndexedDB'
import { generateStub } from '@packages/server/server'
import { setupWorker } from 'msw/browser'

export const createBrowserServiceWorker = async (baseUrl: string) => {
  console.log('Browser Service Worker started in test mode')

  await initDB()
  const { searchMocks, screenListMocks, screenMocks, passthroughMocks } = generateStub(baseUrl)

  const webServer = setupWorker(...searchMocks(), ...screenListMocks(), ...screenMocks(), ...passthroughMocks())
  return await webServer.start()
}
