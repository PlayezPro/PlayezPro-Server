import express from "express"
import { addRelation } from "../controllers/followController.js"
import { checkRelation } from '../controllers/followController.js';
import { deleteRelation } from "../controllers/followController.js";
import { verifyToken } from "../middlewares/authJwt.js";

const followRouter = express.Router();

followRouter.post('/', verifyToken,addRelation);
followRouter.post('/relation',verifyToken,checkRelation);
followRouter.delete('/',verifyToken,deleteRelation)

export default followRouter;