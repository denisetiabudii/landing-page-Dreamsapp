import rateLimit from 'express-rate-limit'

import { config } from '../config/env.mjs'

// =========================================
// RATE LIMITERS
// =========================================

function createLimiter(limit) {
  return rateLimit({
    windowMs: config.rateLimit.windowMs,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler(request, response) {
      response.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMITED',
          message: 'Terlalu banyak permintaan. Silakan coba kembali nanti.',
        },
      })
    },
  })
}

export const publicRateLimiter = createLimiter(config.rateLimit.publicMax)
export const whatsappLinkRateLimiter = createLimiter(config.rateLimit.linkMax)
