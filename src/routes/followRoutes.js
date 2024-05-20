import express from "express"
import { addRelation } from "../controllers/followController.js"

const followRouter = express.Router();

followRouter.post('/', addRelation);

export default followRouter;