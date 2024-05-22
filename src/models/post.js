import mongoose from "mongoose";

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

const dateTime= giveCurrentDateTime()
const postSchema = new mongoose.Schema({
      users_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    file: String,
    title: String,
    description: String,
    category: String ,
    likesCount: { type: Number, default: 0 }, // Campo para contar los likes
    Created_At: { type: String, default: dateTime }
}


);

const postModel = mongoose.model('posts', postSchema);
export default postModel;