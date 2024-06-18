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
    },

    isLiked: {
        type: Boolean,
        default: false // O false, dependiendo de si deseas que el valor predeterminado sea "me gusta" o "no me gusta"
    }
});

const likesModel = mongoose.model('likes', likesSchema);
export default likesModel;
