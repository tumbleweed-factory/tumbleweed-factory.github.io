// Run default Bun server
import Bun from 'bun'
import React from 'react'

import { renderToString } from 'react-dom/server'
import { App } from './app'

const server = Bun.serve({
  port: 8080,
  fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/react-client.js') {
      return new Response(Bun.file('./react-client.js'))
    }

    // const html = renderToString(<App />)
    // console.log(html)

    const resp = new Response(`<html>
    <head>
      <title>Bun</title>
      <script defer src="/react-client.js"></script>
    </head>
    <body>
      <h1>Hello, Bun!</h1>
      <h2>Now is: ${new Date().toLocaleString()}</h2>
      <div id="root"></div>
    </body>
  </html>`)

    resp.headers.set('Content-Type', 'text/html')

    return resp
  },
})

console.log(`Listening on localhost:${server.port}`)
