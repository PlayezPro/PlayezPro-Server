import mongoose from "mongoose";

const { Schema } = mongoose;

const shareSchema = new Schema({
    posts_id: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    users_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

const shareModel = mongoose.model('share', shareSchema);
export default shareModel;
