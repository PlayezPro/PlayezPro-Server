import express from "express";
import { getLastPosts, createPost,deletePost,getPostId, showUserPosts, editBlog, getRankedPosts } from "../controllers/postController.js";
import videoLimiter from "../middlewares/filesizelimiter.js";
import { verifyToken } from "../middlewares/authJwt.js";


const postRouter = express.Router();

postRouter.get('/',verifyToken, getLastPosts);
postRouter.get('/:id',getPostId)
postRouter.get('/users/:users_id', showUserPosts)
postRouter.post('/',videoLimiter,createPost);
postRouter.delete('/:id', deletePost);
postRouter.put('/:id',editBlog)
// postRouter.get('/rankedLikes', getRankedPosts); // Nueva ruta para los rankings

export default postRouter;