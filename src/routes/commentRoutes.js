import express from "express"
import { createComment, deleteComment, showAllComment, updateComment } from "../controllers/commentsController.js"

const commentRouter = express.Router();

commentRouter.post('/', createComment);
commentRouter.get('/', showAllComment)
commentRouter.delete('/:id', deleteComment)
commentRouter.put('/:id', updateComment);

export default commentRouter;