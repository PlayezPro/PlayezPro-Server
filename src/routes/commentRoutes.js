import express from "express"
import { createComment, deleteComment, showAllComment, updateComment,showPostComments } from "../controllers/commentsController.js"

const commentRouter = express.Router();

commentRouter.post('/', createComment);
commentRouter.get('/', showAllComment)
commentRouter.get('/:posts_id',showPostComments)
commentRouter.delete('/:id', deleteComment)
commentRouter.put('/:id', updateComment);

export default commentRouter;