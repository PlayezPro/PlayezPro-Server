import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
    details_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'details'
    },
    games: Number,
    goals: Number,
    assistance: Number,
    votes: Number
})

const Statistics = mongoose.model('Statistics', statisticsSchema);

export default Statistics;