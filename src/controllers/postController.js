import postModel from "../models/post.js";
import config from "../firebase/firebase.js"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { memory } from "../middlewares/uploadMedia.js";




export const getLastPosts = async(req,res)=> {
    try {
        const lastPost = await postModel.find()
        res.status(200).json(lastPost)
    } catch (error) {
        res.status(500).json({message : 'Error al obtener el ultimo post'})
    }
}

initializeApp(config.firebaseConfig);
const storage = getStorage();
export const createPost = async(req,res)=> {

    
    try {
        console.log('Body de la solicitud:', req.body);
        await memory.single('file')(req,res, async (err)=> {
            if(err){
                console.error('Error al cargar el archivo en memoria:', err);
                return res.status(500).json({ message: 'Error al cargar el archivo en memoria' });
            }

            const fileBuffer = req.file.buffer;
            

            const tempFileRef = ref(storage,  `media/${req.file.originalname}`);

            await uploadBytes(tempFileRef,fileBuffer)

            const tempFileDownloadUrl = await getDownloadURL(tempFileRef);

            const {users_id,title,description,date,category} =req.body;
            const newPost = new postModel({
                users_id: users_id,
                file: tempFileDownloadUrl, // Guardar la URL del archivo temporal en la base de datos
                title: title,
                description: description,
                category: category,
            }); 

            await newPost.save();
            return res.status(200).json({ message: 'Post creado correctamente', newPost });
        })
    } catch(error) {
        console.error('Error al crear el post:', error);
        return res.status(500).json({ message: 'Error al crear el post' });
    }

}

export const deletePost = async ( req,res) => {
    const id = req.params.id
    try {
        await postModel.deleteOne({_id:id})
        res.status(204).json({message: "Post eliminado ",id})
    } catch (error) {
        res.status(500).json({message: "Fallo al eliminar el post", error})
    }
}

export const getPostId = async (req,res) => {
    const id = req.params.id
    try {
       const onePost= await postModel.findOne({_id:id});
       res.status(200).json(onePost)
    } catch (error) {
        res.status(500).json({message: "error al mostrar el post",error})
    }
}

export const showUserPosts = async (req, res) => {
    const usersId = req.params.users_id;
    console.log(usersId)
    try {
       const userPosts= await postModel.find({users_id : usersId});
       res.status(200).json(userPosts)
    } catch (error) {
     res.status(500).json(error)
    }
}

export const editBlog = async (req, res) => {
    const postId = req.params.id;
    const {title,description,category} = req.body
    try {
        await postModel.updateOne( 
            { _id: postId }, 
            { $set: { title, description, category } }
        );
        res.status(200).json({message:"datos Modificado Satisfactoriamente", postId})

    } catch (error) {
        console.error('Error al actualizar el blog', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};