import express from "express";
import { createLike, removeLike ,checkIsLiked} from "../controllers/likesController.js";

const likeRouter = express.Router();

// Ruta para crear un like
likeRouter.post('/', createLike);

// Ruta para eliminar un like
likeRouter.delete('/', removeLike);
likeRouter.post('/likecheck', checkIsLiked);

export default likeRouter;
