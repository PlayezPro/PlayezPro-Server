import mongoose , {Schema} from "mongoose";

const likesSchema = new mongoose.Schema({
    posts_id: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    users_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})


const likesModels = mongoose.model('likes', likesSchema);
export default likesModels