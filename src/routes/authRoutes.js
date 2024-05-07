import { Router } from "express";
import { signIn, singUp } from "../controllers/authController.js";

const router = Router()

router.post('/signup', singUp)
router.post('/signin', signIn)

export default router