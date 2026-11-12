import { AppError } from '../utils/errors.mjs'

export function notFoundHandler(request, response) {
  response.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Endpoint tidak ditemukan.' },
  })
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) return next(error)

  if (error instanceof AppError) {
    const body = {
      success: false,
      error: { code: error.code, message: error.message },
    }
    if (error.details) body.error.details = error.details
    return response.status(error.status).json(body)
  }

  if (error?.type === 'entity.too.large') {
    return response.status(413).json({
      success: false,
      error: {
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Ukuran permintaan terlalu besar.',
      },
    })
  }

  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({
      success: false,
      error: { code: 'INVALID_JSON', message: 'Format JSON tidak valid.' },
    })
  }

  console.error('Unhandled API error:', {
    name: error?.name,
    code: error?.code,
    status: error?.response?.status,
    message: error?.message,
    googleErrors: error?.response?.data?.error?.errors?.map(
      ({ reason, message }) => ({
        reason,
        message,
      }),
    ),
  })
  return response.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Terjadi kesalahan pada server.',
    },
  })
}
