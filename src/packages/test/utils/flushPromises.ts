const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout

export const flushPromises = () => {
  return new Promise((resolve) => {
    scheduler(resolve)
  })
}
