import { Router } from "express";
import { signIn, singUp } from "../controllers/authController.js";
import { checkDuplicateUsernameorEmail } from "../middlewares/verifySignup.js";
import rateLimit from "express-rate-limit";

const router = Router()

router.post('/signup', checkDuplicateUsernameorEmail, singUp)
router.post('/signin', rateLimit, signIn)

export default router