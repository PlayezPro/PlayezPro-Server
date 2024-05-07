import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema({
    name: {type: String},
    lastName: {type: String},
    userName: { type: String, unique: true }, 
    email: { type: String, unique: true },
    phoneNumber: {type: Number, unique: true},
    password: { type: String, required: true },
    roles: [{ref: 'roles', type: Schema.Types.ObjectId}]
},{
    timestamps : true,
    versionKey : false
})

UserSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export const Users = mongoose.model('user', UserSchema)