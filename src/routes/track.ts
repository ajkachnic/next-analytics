import { generateId } from "../lib/generate-id"
import { validateUserData } from "../lib/validate"
import { Handler } from "../types"

const handler: Handler = async (request, response) => {
  const { body } = request

  const data = validateUserData(body)
  // Checks for invalid data
  if(typeof data === 'string') {
    response.status(400)
    response.send(data)
    return
  }

  const hits = await request.database.collection('hits')
  const { href, ...rest} = data
  const ip = request.socket.remoteAddress || request.connection.remoteAddress || ''
  const user = generateId(ip, data.userAgent)
  try {
    const url = new URL(href || '')
    await hits.insertOne({
      ...rest,
      path: url.pathname,
      href,
      user,
      date: new Date().getTime(),
    })
    response.status(201)
    response.send({})
  } catch {
    response.status(500)
    response.send("We had an error trying to process your request")
  }

}

export default handler