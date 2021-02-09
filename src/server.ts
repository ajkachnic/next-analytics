import { useMongo } from './database'
import type { Handler } from './types'
import * as routes from './routes'

export const handleAnalytics: Handler = (request, response, options) => {
  return new Promise(async resolve => {
    useMongo(request, response, options)
    if(!request.query.nextanalytics) {
      const error = `Cannot find [...nextanalytics].js in pages/api/analytics.`

      return response.status(500).end(`Error: ${error}`)
    }

    const {
      nextanalytics,
      action = nextanalytics[0]
    } = request.query

    if(request.method === 'GET') {
      switch(action) {
        case 'track':
          return routes.track(request, response, options)
        case 'query':
          return routes.query(request, response, options)
      }
    }
    return response.status(4004).send("Not found.")
  })
}