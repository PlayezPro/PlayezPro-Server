import { Roles } from "../models/roles.js"
import { Users } from "../models/user.js"

export const checkDuplicateUsernameorEmail = async (req, res, next) => {
    const user = await Users.findOne({userName: req.body.userName}) 

    if(user) return res.status(400).json({message: 'The User Already exists'})

    const email = await Users.findOne({email: req.body.email})

    if(email) return res.status(400).json({message: 'The Email Already exists'})

    const phoneNumber = await Users.findOne({phoneNumber: req.body.phoneNumber})

    if(phoneNumber) return res.status(400).json({message: 'The Phone Number Already exists'})

    next()
}

export const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!Roles.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists`
                })
            }
        }
    }
    next()
}