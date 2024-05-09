import mongoose from "mongoose";

const { Schema } = mongoose;

const likesSchema = new Schema({
    posts_id: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    users_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const likesModel = mongoose.model('likes', likesSchema);
export default likesModel;
