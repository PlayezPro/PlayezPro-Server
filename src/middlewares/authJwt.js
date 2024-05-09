import jwt from "jsonwebtoken";
import {Users} from '../models/user.js'
import {Roles} from '../models/roles.js'
import dotenv from 'dotenv'

dotenv.config();

const SECRET = process.env.JWT_SECRET;
export const verifyToken = async (req, res, next) => {
    try {
      const token = req.header("access");
      console.log(token)
  
      if (!token) return res.status(403).json({ message: "No Token Provider" });
  
      const decoded = jwt.verify(token, SECRET);
  
      req.userId = decoded.id;
  
      const user = await Users.findById(req.userId, { password: 0 });
      console.log(user);
  
      if (!user) return res.status(404).json({ message: 'No User Found' });
  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
  
  export const isAdmin = async (req, res, next) => {
    const user = await Users.findById(req.userId);
    const roles = await Roles.find({ _id: { $in: user.roles } });
  
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].id === "6639dbc70fc2fd0ef9038cdd") {
        next();
        return;
      }
    }
  
    return res.status(403).json({ message: 'Require Admin Role' });
  }