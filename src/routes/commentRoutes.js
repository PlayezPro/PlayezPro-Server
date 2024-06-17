import express from "express"
import { createComment, deleteComment, showAllComment, updateComment,showPostComments } from "../controllers/commentsController.js"
import { verifyToken } from "../middlewares/authJwt.js";

const commentRouter = express.Router();

commentRouter.post('/',verifyToken, createComment);
commentRouter.get('/', showAllComment)
commentRouter.get('/:posts_id',showPostComments)
commentRouter.delete('/:id', deleteComment)
commentRouter.put('/:id', updateComment);

export default commentRouter;