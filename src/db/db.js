import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const DB = process.env.DB;

export const db = async () => {
    try {
       await mongoose.connect(DB)
        console.log("Connected Data Base")
    } catch (error) {
        console.log(error)
    }
}