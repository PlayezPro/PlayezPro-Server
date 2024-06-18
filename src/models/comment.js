import mongoose, { Schema } from "mongoose";

const commentsSchema = new Schema({
    posts_id: {
        type: Schema.Types.ObjectId,
        ref: 'posts',
        required:true
    },
    users_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comments: {type: String, required:true},
})

const commentsModel = mongoose.model('comments', commentsSchema);
export default commentsModel;
