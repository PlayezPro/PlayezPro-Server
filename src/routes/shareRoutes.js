import express from 'express';
import { sharedPost } from '../controllers/shareController.js';

const shareRouter = express.Router();

// Ruta para compartir una publicación
shareRouter.post('/', sharedPost);

export default shareRouter;