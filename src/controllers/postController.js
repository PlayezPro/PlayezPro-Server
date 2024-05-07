import postModel from "../models/post.js";
import config from "../firebase/firebase.js"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { memory } from "../middelware/uploadMedia.js";




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