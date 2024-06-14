import { Router } from "express";
import { signIn, singUp } from "../controllers/authController.js";
import { checkDuplicateUsernameorEmail } from "../middlewares/verifySignup.js";
import { limiter } from "../middlewares/rateLimite.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router()

router.post('/signup', checkDuplicateUsernameorEmail, singUp)
router.post('/signin', verifyToken, limiter, signIn)

export default router