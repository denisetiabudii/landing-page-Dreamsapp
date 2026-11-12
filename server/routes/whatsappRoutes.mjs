import { Router } from 'express'

import { config } from '../config/env.mjs'
import { whatsappLinkRateLimiter } from '../middleware/rateLimiters.mjs'
import { AppError } from '../utils/errors.mjs'
import { buildWhatsappUrl, generalMessage } from '../utils/whatsapp.mjs'

export function createWhatsappRoutes() {
  const router = Router()

  router.get('/', whatsappLinkRateLimiter, (request, response) => {
    const whatsapp_url = buildWhatsappUrl(
      config.whatsapp.number,
      generalMessage,
    )

    if (!whatsapp_url) {
      throw new AppError(
        503,
        'WHATSAPP_NOT_CONFIGURED',
        'Tautan WhatsApp belum dikonfigurasi.',
      )
    }

    response.json({ success: true, data: { whatsapp_url } })
  })

  return router
}
