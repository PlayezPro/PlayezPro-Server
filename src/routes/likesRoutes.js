import express from "express";
import { createLike, removeLike ,checkIsLiked, totalLikes} from "../controllers/likesController.js";

const likeRouter = express.Router();

// Ruta para crear un like
likeRouter.post('/', createLike);

// Ruta para eliminar un like
likeRouter.delete('/', removeLike);
likeRouter.post('/likecheck', checkIsLiked);
likeRouter.get('/totallikes/:posts_id', totalLikes)

export default likeRouter;
