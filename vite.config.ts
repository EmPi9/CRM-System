// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function sseMockPlugin() {
  return {
    name: 'sse-mock-plugin',

    configureServer(server) {
      server.middlewares.use('/mock/sse', (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache, no-transform')
        res.setHeader('Connection', 'keep-alive')

        let eventId = 1

        const sendEvent = () => {
          const event = {
            id: eventId,
            status: getRandomStatus(),
            message: 'Mock SSE event',
            createdAt: new Date().toISOString(),
          }

          res.write(`id: ${eventId}\n`)
          res.write('event: operation-status\n')
          res.write(`data: ${JSON.stringify(event)}\n\n`)

          eventId += 1
        }

        sendEvent()

        const intervalId = setInterval(sendEvent, 2000)

        req.on('close', () => {
          clearInterval(intervalId)
          res.end()
        })
      })
    },
  }
}

function getRandomStatus() {
  const statuses = [
    'created',
    'pending',
    'processing',
    'approved',
    'completed',
    'failed',
  ]

  return statuses[Math.floor(Math.random() * statuses.length)]
}

export default defineConfig({
  plugins: [
    react(),
    sseMockPlugin(),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'https://easydev.club',
        changeOrigin: true,
      },
    },
  },
})