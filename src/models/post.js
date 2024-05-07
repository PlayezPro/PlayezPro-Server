import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    file: String,
    title: String,
    description: String,
    date: Date,
    category: String ,
});

const postModel = mongoose.model('posts', postSchema);
export default postModel;