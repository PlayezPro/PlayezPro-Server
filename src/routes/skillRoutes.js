import { Router } from "express";
import {getSkill, getOneSkill, createSkill, updateSkill, deleteSkill} from '../controllers/skillController.js'

const router = Router()

router.post('/', createSkill)
router.get('/', getSkill)
router.get('/:users_id', getOneSkill)
router.put('/:id', updateSkill)
router.delete('/:id', deleteSkill)

export default router