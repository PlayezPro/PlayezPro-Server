import { rateLimit } from 'express-rate-limit';

export const tokenExpirationTime = 3 * 60 * 60 * 1000

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos en milisegundos
    max: 3, // Número máximo de intentos permitidos por ventana
    message: {
      error: 'Too many login attempts, please try again in 15 minutes.',
      status: 429
    },
    headers: true, // Incluir información de limitación de tasa en los encabezados de la respuesta
    standardHeaders: true, // Enviar encabezados `RateLimit-*` conforme a los estándares
    legacyHeaders: false, // Deshabilitar los encabezados `X-RateLimit-*` no estándar
  });