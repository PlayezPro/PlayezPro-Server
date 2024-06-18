import commentsModel from "../models/comment.js";
import postsModel from '../models/post.js'; 

export const createComment = async (req, res) => {
    const { posts_id, users_id, comments } = req.body; // Corregí el nombre de la propiedad comments a comment para que coincida con lo que se espera

    try {
        // Crear un nuevo comentario
        const newComment = new commentsModel({
            posts_id: posts_id,
            users_id: users_id,
            comments: comments, // Corregí el nombre de la propiedad comments a comment para que coincida con lo que se espera
        });

        // Guardar el nuevo comentario en la base de datos
        const savedComment = await newComment.save();

        // Si el comentario se guardó correctamente, devolverlo como respuesta
        res.status(201).json(savedComment);
    } catch (error) {
        // Si hay un error, devolver un mensaje de error
        res.status(500).json({ message: 'Hubo un error al crear el comentario', error: error.message });
    }
};

export const showAllComment = async (req, res) => {
    try { 
        const showAllComments = await commentsModel.find();
        if (!showAllComments || showAllComments.length === 0) { // Verificar si no hay comentarios
            return res.status(404).json({ message: 'No hay comentarios para mostrar' });
        }
        // Si hay comentarios, devolverlos
        res.status(200).json(showAllComments);
    } catch (error) {
        res.status(500).json({ message: 'Error al mostrar comentarios', error: error.message });
    }
};

export const showPostComments = async (req,res) => {
    try {
       const showComments = await commentsModel.find({posts_id:req.params.posts_id})
       res.status(200).json(showComments)
    } catch (error) {
       res.status(400).json({message:"error al obtener comentarios"})
    }
}

export const deleteComment = async (req, res) => {
    try {
        const deletedComment = await commentsModel.findByIdAndDelete(req.params.id);
        
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al intentar eliminar el comentario', error: error.message });
    }
};

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        // Buscar el comentario por su ID
        const commentToUpdate = await commentsModel.findById(id);

        if (!commentToUpdate) {
            // Si no se encuentra el comentario, devolver un error
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        // Actualizar el comentario
        commentToUpdate.comments = comment;
        await commentToUpdate.save();

        // Devolver el comentario actualizado
        res.status(200).json(commentToUpdate);
    } catch (error) {
        // Si hay un error, devolver un mensaje de error
        res.status(500).json({ message: 'Hubo un error al actualizar el comentario'});
    }
}



