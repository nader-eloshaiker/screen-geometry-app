export const getRandomInt = (max: number, min = 0) => {
  if (min > max) throw new Error('min must be less than max')
  return Math.floor(Math.random() * (max - min) + min)
}
