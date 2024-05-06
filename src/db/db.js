import mongoose from "mongoose";

export const db = async () => {
    try {
       await mongoose.connect("mongodb+srv://jeancperez09:hWF0Kz1mwkY6oOkq@playezpro.72akomp.mongodb.net/?retryWrites=true&w=majority&appName=PlayezPro")
        console.log("Connected Data Base")
    } catch (error) {
        console.log(error)
    }
}