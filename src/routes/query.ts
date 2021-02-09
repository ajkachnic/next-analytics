import { validateUserQuery } from "../lib/validate"
import { Handler, UserQuery } from "../types"

const generateQuery = (query: UserQuery) => {
  const q = {
    date: query.to ? { $lt: query.to, $gt: query.from } : { $gt: query.from },
    path: query.path,

  }
  return q
}

const handler: Handler = async (request, response) => {
  const { body } = request

  const data = validateUserQuery(body)
  // Checks for invalid data
  if(typeof data === 'string') {
    response.status(400)
    response.send(data)
    return
  }

  const hits = await request.database.collection('hits')
  const query = generateQuery(data)
  const result = await hits.find(query).toArray()

  response.status(200)
  response.send(result)
}

export default handler