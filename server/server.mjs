import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createApp } from './app.mjs'
import { config } from './config/env.mjs'

// =========================================
// FRONTEND BUILD DIRECTORY
// =========================================

const frontendDistPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../dist',
)

const frontendIndexPath = resolve(frontendDistPath, 'index.html')

const frontendDist = existsSync(frontendIndexPath)
  ? frontendDistPath
  : undefined

if (!frontendDist) {
  console.warn(
    'Frontend build tidak ditemukan. Express berjalan dalam mode API saja.',
  )
}

// =========================================
// SERVER
// =========================================

const app = createApp(undefined, { frontendDist })

const server = app.listen(config.port, () => {
  console.log(`DREAMS application listening on port ${config.port}`)
})

// =========================================
// GRACEFUL SHUTDOWN
// =========================================

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log(`${signal} received. Closing DREAMS application...`)

    server.close((error) => {
      if (error) {
        console.error('Failed to close server:', error)
        process.exitCode = 1
        return
      }

      console.log('DREAMS application closed successfully.')
    })
  })
}
