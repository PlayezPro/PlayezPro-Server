import likesModel from "../models/likes.js"

export const createLike = async(req,res) => {
    const { posts_id, users_id } = req.body;
        try {
            const newLike = new likesModel({
                posts_id: posts_id,
                users_id: users_id

            })
        await newLike.save()
        return res.status(200).json({message: 'eres pendejo', newLike})

        
    }catch(error){

    }
}