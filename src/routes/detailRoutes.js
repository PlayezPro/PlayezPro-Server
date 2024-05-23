import express from "express";
import { createDetails, getAllDetails, updateDetails, deleteDetails, getDetailById } from "../controllers/detailController.js";

const router = express.Router();

router.post('/', createDetails);
router.get('/',  getAllDetails);
router.get('/:id', getDetailById);
router.put('/:id', updateDetails);
router.delete('/:id', deleteDetails);

export default router;