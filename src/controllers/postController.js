import postModel from "../models/post.js";
import config from "../firebase/firebase.js"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { memory } from "../middlewares/uploadMedia.js";
import * as Handbrake from 'handbrake-js';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


export const getLastPosts = async(req,res)=> {
    try {
        const lastPost = await postModel.find()
        res.status(200).json(lastPost)
    } catch (error) {
        res.status(500).json({message : 'Error al obtener el ultimo post'})
    }
}

function getRandomFileName(originalName) {
    const extension = originalName.split('.').pop(); // Obtener la extensión del archivo
    const randomName = uuidv4(); // Generar un UUID
    return `${randomName}.${extension}`; // Combinarlo con la extensión original
}

// Inicializar Firebase
initializeApp(config.firebaseConfig);
const storage = getStorage();

// Función para crear un post
export const createPost = async (req, res) => {
    try {

            const fileBuffer = req.file.buffer;

            // Escribir el buffer en un archivo temporal
            const tempFilePath = path.join(os.tmpdir(), req.file.originalname);
            fs.writeFileSync(tempFilePath, fileBuffer);

            // Redimensionar el video utilizando HandBrake
            const outputFilePath = path.join(os.tmpdir(), `resized_${req.file.originalname}`);
            const handbrakeOptions = {
                input: tempFilePath,
                output: outputFilePath,
                optimize: '0',
                width: 640,
                height: 480,
            };

            Handbrake.run(handbrakeOptions)
                .then(async () => {
                    // Generar un nombre de archivo aleatorio
                    const randomFileName = getRandomFileName(req.file.originalname);

                    // Subir el video redimensionado a Firebase Storage
                    const tempFileRef = ref(storage, `media/${randomFileName}`);
                    const tempFileBuffer = fs.readFileSync(outputFilePath);
                    await uploadBytes(tempFileRef, tempFileBuffer);

                    const tempFileDownloadUrl = await getDownloadURL(tempFileRef);

                    const { users_id, title, description, date, category } = req.body;
                    const newPost = new postModel({
                        users_id: users_id,
                        file: tempFileDownloadUrl, // Guardar la URL del archivo en la base de datos
                        title: title,
                        description: description,
                        category: category,
                    });

                    await newPost.save();
                    fs.unlinkSync(tempFilePath); // Eliminar el archivo temporal de entrada
                    fs.unlinkSync(outputFilePath); // Eliminar el archivo temporal de salida
                    return res.status(200).json({ message: 'Post creado correctamente', newPost });
                })
                .catch((err) => {
                    console.error('Error al redimensionar el video:', err);
                    return res.status(500).json({ message: 'Error al redimensionar el video' });
                });
          } catch (error) {
        console.error('Error al crear el post:', error);
        return res.status(500).json({ message: 'Error al crear el post' });
    }
};







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
    console.log("Controlador showUserPosts ejecutado");
    const usersId = req.params.users_id;
    console.log(usersId);
    try {
       const userPosts= await postModel.find({users_id : usersId});
       res.status(200).json(userPosts);
    } catch (error) {
     res.status(500).json(error);
    }
};

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

//Ordered by likes, ranking 
export const getRankedPosts = async (req, res) => {
    try {
        const rankedPosts = await postModel.aggregate([
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'likes'
                }
            },
            {
                $addFields: {
                    totalLikes: { $size: '$likes' }
                }
            },
            {
                $sort: { totalLikes: -1 }
            }
        ]);

        res.status(200).json(rankedPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ranked posts', error });
    }
};
