import express from "express";
import { createDetails, getAllDetails, updateDetails, deleteDetails, getDetailById,addProfileImg } from "../controllers/detailController.js";

const router = express.Router();

router.post('/', createDetails);
router.get('/',  getAllDetails);
router.get('/:userId', getDetailById);
router.put('/:id', updateDetails);
router.put('/profile/:id', addProfileImg);
router.delete('/:id', deleteDetails);

export default router;