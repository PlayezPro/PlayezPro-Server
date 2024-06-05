import express from "express";
import { createNotification, deleteNotification, getUserNotifications, markAsRead } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.post('/', createNotification);
notificationRouter.delete('/', deleteNotification);
notificationRouter.get('/:userId', getUserNotifications);
notificationRouter.put('/markasread', markAsRead);

export default notificationRouter;
