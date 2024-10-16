import { HttpHandler } from 'msw'
import { SetupServer, setupServer } from 'msw/node'

const mswRequestEventStack: string[] = []
let mswServer: SetupServer | undefined = undefined

export const mswWithSpy = (handlers: Array<HttpHandler>) => {
  mswServer = setupServer(...handlers)

  mswServer.events.on('request:start', async ({ request }) => {
    const payload = `method:${request.method}|url:${request.url}|formData:${JSON.stringify(request.formData, null, 2)}`
    mswRequestEventStack.push(payload)
  })

  return mswRequestEventStack
}

export const resetMSW = () => {
  mswRequestEventStack.splice(0, mswRequestEventStack.length)
  mswServer?.resetHandlers()
  mswServer?.restoreHandlers()
}

export const startMSW = () => {
  if (!mswServer) {
    return
  }

  mswServer.listen()
}

export const stopMSW = () => {
  if (!mswServer) {
    return
  }

  mswServer.close()
}
