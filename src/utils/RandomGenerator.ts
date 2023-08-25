export const getRandomInt = (max: number, min = 0) => {
  if (min > max) throw new Error('min must be less than max')
  return Math.floor(Math.random() * (max - min) + min)
}

export const getRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
