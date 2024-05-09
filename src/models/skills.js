import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    details_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'details'
    },
    attack: Number,
    defense: Number,
    dribble: Number,
    speed: Number,
    force: Number
})

const Skill = mongoose.model('Skills', skillSchema);

export default Skill;
