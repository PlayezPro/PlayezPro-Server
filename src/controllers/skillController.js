import  Skill  from "../models/skills.js";

export const createSkill = async (req, res) =>{
    const {details_id, attack, defense, dribble, speed, force} = req.body
    try {
        const skill = new Skill ({
            details_id: details_id,
            attack: attack,
            defense: defense,
            dribble: dribble,
            speed: speed,
            force: force
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
    const id = req.params.id
    try {
        const skill = await Skill.find({_id:id})
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