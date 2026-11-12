import { Router } from 'express'

import { createDemoRequestsController } from '../controllers/demoRequestsController.mjs'
import { publicRateLimiter } from '../middleware/rateLimiters.mjs'

// =========================================
// DEMO REQUEST ROUTES
// =========================================

export function createDemoRequestRoutes(model) {
  const router = Router()
  const controller = createDemoRequestsController(model)

  router.post('/', publicRateLimiter, controller.create)

  return router
}
