import { generateStub } from '@server/server'
import { setupWorker } from 'msw/browser'

export const createBrowserServiceWorker = async (baseUrl: string, nodeEnv: boolean) => {
  const { searchMocks, screenListMocks, screenMocks, passthroughMocks } = generateStub(baseUrl)

  if (nodeEnv) {
    console.log('Browser Service Worker not started in test mode')
    return Promise.resolve()
  } else {
    console.log('Browser Service Worker started in test mode')
  }

  const webServer = setupWorker(...searchMocks(), ...screenListMocks(), ...screenMocks(), ...passthroughMocks())
  return await webServer.start()
}
