import  Skill  from "../models/skills.js";

export const createSkill = async (req, res) =>{
    const {users_id,pace, shot, dribble, pas, defense,physical} = req.body
    try {
        const skill = new Skill ({
            users_id:users_id,
            pace:pace,
            shot:shot,
            defense: defense,
            dribble: dribble,
            pas:pas,
            physical:physical,
        })
        await skill.save()
        res.status(201).json({message:"Skill Registered", skill})
    } catch (error) {
        res.status(500).json({message:"not found", error})  
    }
}

export const getSkill = async (req, res) => {
    try {
        const skill = await Skill.find()
        res.status(200).json(skill)
    } catch (error) {
        res.status(500).json({message:"not found", error})
    }
}

export const getOneSkill = async (req, res) => {
    const id = req.params.users_id
    try {
        const skill = await Skill.find({users_id:id})
        res.status(200).json(skill)
    } catch (error) {
        res.status(500).json({message:"not found", error})
    }
}

export const deleteSkill = async (req, res) => {
    const id = req.params.id
    try {
        await Skill.deleteOne({_id:id},req.body) 
        res.status(200).json({message:"Skill deleted correctly", id})
    } catch (error) {
        res.status(500).json({message:"not found", error})
    }
}

export const updateSkill = async (req, res) => {
    const id = req.params.id
    try {
        await Skill.updateOne({_id:id},req.body) 
        res.status(200).json({message:"Skill modified correctly", id})
    } catch (error) {
        res.status(500).json({message:"not found", error})
    }
}