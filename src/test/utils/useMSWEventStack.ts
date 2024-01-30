import { SetupServer } from 'msw/node'

const mswRequestEventStack: string[] = []

export const useMSWEventStack = (server: SetupServer) => {
  server.events.on('request:start', async ({ request }) => {
    const payload = `method:${request.method}|url:${request.url}|formData:${JSON.stringify(request.formData, null, 2)}`
    mswRequestEventStack.push(payload)
  })

  return mswRequestEventStack
}

export const resetMSWEventStack = () => {
  mswRequestEventStack.length = 0
}
