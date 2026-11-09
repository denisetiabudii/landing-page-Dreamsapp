import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { config } from './config/env.mjs'
import { createDemoRequestModel } from './models/demoRequestModel.mjs'
import { createDemoRequestRoutes } from './routes/demoRequestRoutes.mjs'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.mjs'
import { AppError } from './utils/errors.mjs'
import { createWhatsappRoutes } from './routes/whatsappRoutes.mjs'

// =========================================
// APP
// =========================================

export function createApp(demoRequestModel = createDemoRequestModel()) {
  const app = express()

  const corsOptions = {
    methods: ['GET', 'POST'], maxAge: 600,
    origin(origin , callback) {
      if (!origin || config.corsOrigins.includes(origin)) {
        return callback(null, true)
      }
      

      return callback(
        new AppError(
          403,
          'CORS_ORIGIN_DENIED',
          'Origin tidak diizinkan oleh kebijakan CORS.',
        ),
      )
    },
  }

  app.disable('x-powered-by')
    if (config.trustProxy > 0) {
    app.set('trust proxy', config.trustProxy)
  }

  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(express.json({ limit: '16kb' }))

  // =========================================
  // CACHE CONTROL
  // =========================================

  app.use('/api/demo-requests', (request, response, next) => {
    response.set('Cache-Control', 'no-store')
    next()
  })

  // =========================================
  // HEALTH CHECK
  // =========================================

  app.get('/health', (request, response) => {
    response.json({
      success: true,
      data: {
        status: 'ok',
      },
    })
  })

  // =========================================
  // DEMO REQUEST API
  // =========================================

  app.use('/api/demo-requests', createDemoRequestRoutes(demoRequestModel))
    app.use('/api/whatsapp-link', createWhatsappRoutes())

  // =========================================
  // ERROR HANDLING
  // =========================================

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}