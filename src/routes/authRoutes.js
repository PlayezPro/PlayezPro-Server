import { Router } from "express";
import { signIn, singUp } from "../controllers/authController.js";
import { checkDuplicateUsernameorEmail } from "../middlewares/verifySignup.js";

const router = Router()

router.post('/signup', checkDuplicateUsernameorEmail, singUp)
router.post('/signin', signIn)

export default router