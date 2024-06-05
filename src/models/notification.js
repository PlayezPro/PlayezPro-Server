import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema({
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
