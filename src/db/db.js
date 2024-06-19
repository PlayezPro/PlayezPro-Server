import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const DB = process.env.DB;

export const db = async () => {
    try {
       await mongoose.connect(DB)
    } catch (error) {
    }
}