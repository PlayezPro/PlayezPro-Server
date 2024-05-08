import { Router } from "express";
import {getStatistics, getOneStatistics, createStatistics, deleteStatistics, updateStatistics} from '../controllers/statisticsController.js'

const router = Router()

router.post('/', createStatistics)
router.get('/', getStatistics)
router.get('/:id', getOneStatistics)
router.put('/:id', updateStatistics)
router.delete('/:id', deleteStatistics)

export default router