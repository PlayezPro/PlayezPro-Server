import express from "express"
import { addRelation } from "../controllers/followController.js"
import { checkRelation } from '../controllers/followController.js';
import { deleteRelation } from "../controllers/followController.js";

import { deleteRelation } from "../controllers/followController.js";

const followRouter = express.Router();

followRouter.post('/', addRelation);
followRouter.post('/relation',checkRelation);
followRouter.delete('/',deleteRelation)

export default followRouter;