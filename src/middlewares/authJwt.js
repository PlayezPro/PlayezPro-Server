import jwt from "jsonwebtoken";
import { Users } from '../models/user.js'
import { Roles } from '../models/roles.js'
import { publicKey } from "../libs/keypair.js";


export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(403).json({ message: "No Token Provided" });

    const decoded = jwt.verify(token, publicKey);
    req.userId = decoded.id;

    const user = await Users.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: 'No User Found' });

    next();
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await Users.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].id === process.env.AdminId) {
      next();
      return;
    }
  }


  return res.status(403).json({ message: 'Require Admin Role' });
}