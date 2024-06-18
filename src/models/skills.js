import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    users_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    pace: Number,
    shot:Number,
    pas:Number,
    dribble: Number,
    defense: Number,    
    physical:Number,
})

const Skill = mongoose.model('Skills', skillSchema);

export default Skill;
