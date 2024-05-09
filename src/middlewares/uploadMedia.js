import { memoryStorage } from "multer";
import multer from "multer";

export const memory = multer ({Storage:memoryStorage()})