import mongoose from "mongoose";

const detailUserSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true,
    },
    photo:{type: String},
    birthYear:{type: Number, required: true},
    nationality:{type: String, required: true},
    currentTeam:{type: String, required: true},
    dorsal:{type: Number, required: true},
    favPosition:{type: String, required: true},
    mainFoot:{type: String, required: true},
    weight: {type: String, required: true },
    height: {type: String, required: true },
}, {timestamps: true} )

export const DetailUser = mongoose.model('DetailUser', detailUserSchema)