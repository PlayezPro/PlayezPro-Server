import  express from "express";
import { createLike } from "../controllers/likesController.js"

const likeRouter = express.Router();

likeRouter.post('/', createLike);

export default likeRouter;