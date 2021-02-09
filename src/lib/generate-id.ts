import crypto from 'crypto'
// Fast script to hash a user's id based on a few parameters
// This identifier is then correlated to the user
export const generateId = (ip: string, ua: string): string => {
  // Uses the month to make sure the identifier expires
  const month = new Date().getMonth()
  const hash = crypto.createHash('sha1')

  const data = `${ip}-${ua}-${month}`

  hash.update(data)
  return hash.digest('base64')
}