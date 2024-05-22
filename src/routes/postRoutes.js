import express from "express";
import { getLastPosts, createPost,deletePost,getPostId, showUserPosts, editBlog, getRankedPosts } from "../controllers/postController.js";





const postRouter = express.Router();

postRouter.get('/', getLastPosts);
// postRouter.get('/rankings', getRankedPosts); // Nueva ruta para los rankings
postRouter.get('/:id',getPostId)
postRouter.get('/users/:users_id', showUserPosts)
postRouter.post('/', createPost);
postRouter.delete('/:id', deletePost);
postRouter.put('/:id',editBlog)

export default postRouter;