import { getGetCountriesMock, getgetGetLanguagesMock } from '@screengeometry/lib-api/gql'
import { generateStub } from '@screengeometry/server'
import { initDB } from '@screengeometry/server/indexedDB'
import { setupWorker } from 'msw/browser'

export const createBrowserServiceWorker = async (baseUrl: string) => {
  console.log('Browser Service Worker started in test mode')

  await initDB()
  const { searchMocks, screenListMocks, screenMocks } = generateStub(baseUrl)

  const webServer = setupWorker(
    ...getGetCountriesMock(),
    ...getgetGetLanguagesMock(),
    ...searchMocks(),
    ...screenListMocks(),
    ...screenMocks()
  )
  const worker = await webServer.start({ onUnhandledRequest: 'bypass' })

  return worker
}
