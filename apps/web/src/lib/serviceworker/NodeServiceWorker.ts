import { HttpHandler } from 'msw'
import { SetupServer, setupServer } from 'msw/node'

export type MswObject = {
  server: SetupServer
  apiEventStack: string[]
  reset: () => void
  start: () => void
  stop: () => void
}

export const initMSW = (handlers: Array<HttpHandler>): MswObject => {
  const apiEventStack: string[] = []
  const server: SetupServer = setupServer(...handlers)

  server.events.on('request:start', async ({ request }) => {
    const payload = `method:${request.method}|url:${request.url}|formData:${JSON.stringify(request.formData, null, 2)}`
    apiEventStack.push(payload)
  })

  const reset = () => {
    apiEventStack.splice(0, apiEventStack.length)
    server?.resetHandlers()
    server?.restoreHandlers()
  }

  const start = () => {
    server.listen()
  }

  const stop = () => {
    server.close()
  }

  return { server, apiEventStack, reset, start, stop }
}
