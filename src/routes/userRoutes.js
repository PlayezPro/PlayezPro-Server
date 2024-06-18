import { Router } from "express";
import {getAllUser, getOneUser, createUser, deleteUser, updateUser} from '../controllers/userController.js'
import { verifyToken } from "../middlewares/authJwt.js";

const router = Router()

router.post('/', createUser)
router.get('/', getAllUser)
router.get('/:id', getOneUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router