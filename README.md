# next-analytics

A simple solution for self-controlled analytics with Next.js. Inspired by [next-auth](https://github.com/nextauthjs/next-auth).

`next-analytics` is relatively privacy conscious. It records the following:

- Unique user id (hash of IP, UA, and month to make it temporary)
- Referrer
- Path
- Time
- Language
- User agent
- Platform

## Setup

### Setting the server

Create a `api/analytics` folder and add the npm package (`nextjs-analytics`). From there, create a new file called `[...nextanalytics].js` (spelling is very important) and add this to it:

```js
import { handleAnalytics } from 'nextjs-analytics/server'

export default handleAnalytics({
  database: 'hits', // The database name to use
  connection: '' // A mongodb connection string (use env variables)
})

```

### Running the client

In your `_app.js` file, add these lines:

```js
import { useAnalytics } from 'nextjs-analytics/client'

// In your component
useAnalytics()
```
