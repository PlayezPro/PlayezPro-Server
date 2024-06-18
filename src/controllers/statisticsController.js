import  Statistics  from "../models/statistics.js";

export const createStatistics = async (req, res) =>{
    const {games, goals, assistance, votes} = req.body
    try {
        const statistics = new Statistics ({
            games: games,
            goals: goals,
            assistance: assistance,
            votes: votes
        })
        await statistics.save()
        res.status(201).json({message:"Statistics Registereds"})
    } catch (error) {
        res.status(500).json({message:"not found"})  
    }
}

export const getStatistics = async (req, res) => {
    try {
        const statistics = await Statistics.find()
        res.status(200).json(statistics)
    } catch (error) {
        res.status(500).json({message:"not found"})
    }
}

export const getOneStatistics = async (req, res) => {
    const id = req.params.id
    try {
        const statistics = await Statistics.find({_id:id})
        res.status(200).json(statistics)
    } catch (error) {
        res.status(500).json({message:"not found"})
    }
}

export const deleteStatistics = async (req, res) => {
    const id = req.params.id
    try {
        await Statistics.deleteOne({_id:id},req.body) 
        res.status(200).json({message:"Statistic deleted correctly"})
    } catch (error) {
        res.status(500).json({message:"not found"})
    }
}

export const updateStatistics = async (req, res) => {
    const id = req.params.id
    try {
        await Statistics.updateOne({_id:id},req.body) 
        res.status(200).json({message:"Statistic modified correctly"})
    } catch (error) {
        res.status(500).json({message:"not found"})
    }
}