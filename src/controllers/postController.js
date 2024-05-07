import postModel from "../models/post.js";

export const getLastPosts = async(req,res)=> {
    try {
        const lastPost = await postModel.find()
        res.status(200).json(lastPost)
    } catch (error) {
        res.status(500).json({message : 'Error al obtener el ultimo post'})
    }
}

export const createPost = async(req,res)=> {

     const {player_id,title,description,date,category} =req.body;
    try {
        const newPost = new postModel({
            // player_id : player_id,
            file: req.file.filename,
            title: title,
            description: description,
            date: date,
            category: category,
        })

        await newPost.save()
        return res.status(200).json({message: 'Post creado correctamente', newPost});

        }catch (error) {

         return res.status(500).json({message : 'Error al crear el post'});
        }
}