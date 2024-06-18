import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    name: { type: String },
    profileImg: { type: String },
    lastName: { type: String },
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    phoneNumber: { type: Number, unique: true },
    password: { type: String, required: true },
    repeatPassword: { type: String, required: true },
    roles: [{ ref: 'roles', type: Schema.Types.ObjectId }]
}, {
    timestamps: true,  // Automatically manage createdAt and updatedAt fields
    versionKey: false  // Disable the version key (__v) added by Mongoose
});

// Method to encrypt the user's password
UserSchema.statics.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);  // Generate salt
    return await bcrypt.hash(password, salt);  // Hash the password with the salt
};

// Method to compare a plain text password with a hashed password
UserSchema.statics.comparePassword = async function (password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
};

// Export the Users model based on the UserSchema
export const Users = mongoose.model('user', UserSchema);
