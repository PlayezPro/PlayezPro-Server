import mongoose from "mongoose";

const { Schema } = mongoose;

const UserRelationSchema = new Schema({
    userfollow: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    userfollower: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    // Otros campos opcionales relacionados con la relación entre usuarios
    isRelation: {
        type: Boolean,
        default: true // O false, dependiendo de si deseas que el valor predeterminado sea "me gusta" o "no me gusta"
    }
}, {
    timestamps: true,
    versionKey: false
});

const followModel = mongoose.model('follow', UserRelationSchema);
export default followModel;
