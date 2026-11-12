import { asyncHandler } from '../utils/errors.mjs'
import { validateDemoInput } from '../utils/validation.mjs'
import { config } from '../config/env.mjs'
import { buildWhatsappUrl, demoRequestMessage } from '../utils/whatsapp.mjs'

// =========================================
// DEMO REQUEST CONTROLLER
// =========================================

export function createDemoRequestsController(model) {
  return {
    create: asyncHandler(async (request, response) => {
      const input = validateDemoInput(request.body)

      const record = await model.create(input)

      const whatsapp_url = buildWhatsappUrl(
        config.whatsapp.number,
        demoRequestMessage(record),
      )

      response.status(201).json({
        success: true,
        data: { ...record, whatsapp_url },
      })
    }),
  }
}
