import { rateLimit } from 'express-rate-limit';

export const tokenExpirationTime = 3 * 60 * 60 * 1000

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 3, // Max number of entries to try log in
    message: 'Too many fail requests, try in again in 15 minutes',
})

