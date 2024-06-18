import mongoose from 'mongoose';

export const ROLES = ["player", "admin"]

const rolesSchema = mongoose.Schema({
    name : String,
    },
    {versionKey : false})

export const Roles = mongoose.model('roles', rolesSchema)