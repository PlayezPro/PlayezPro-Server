import express from "express";
import { getLastPosts, createPost } from "../controllers/postController.js";


const postRouter = express.Router();

postRouter.get('/', getLastPosts);
postRouter.post('/', createPost);

export default postRouter;