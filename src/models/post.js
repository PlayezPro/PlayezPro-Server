import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
      player_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    file: String,
    title: String,
    description: String,
    date: Date,
    category: String ,
});

const postModel = mongoose.model('posts', postSchema);
export default postModel;