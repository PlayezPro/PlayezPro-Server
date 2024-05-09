import express from "express";
import { createLike, removeLike } from "../controllers/likesController.js";

const likeRouter = express.Router();

// Ruta para crear un like
likeRouter.post('/', createLike);

// Ruta para eliminar un like
likeRouter.delete('/', removeLike);

export default likeRouter;
