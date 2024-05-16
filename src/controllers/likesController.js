import likesModels from "../models/likes.js";
import PostModel from "../models/post.js";

export const createLike = async (req, res) => {
    const { posts_id, users_id } = req.body; // Asegúrate de que los nombres de los campos coincidan con los nombres en tu modelo de datos
    try {
        // Comprobar si ya existe un like para este usuario y este post
        const existingLike = await likesModels.findOne({ posts_id: posts_id, users_id: users_id });
        if (existingLike) {
            return res.status(400).json({ error: 'El usuario ya ha dado like a este post' });
        }

        // Crear el nuevo like
        const newLike = new likesModels({
            posts_id: posts_id,
            users_id: users_id
        });
        await newLike.save();

        // Incrementar el contador de likes en el post
        await PostModel.findByIdAndUpdate(posts_id, { $inc: { likesCount: 1 } });
        newLike.isLiked = true;
        await newLike.save();

        return res.status(200).json({ message: 'Like añadido correctamente', newLike });
    } catch (error) {
        console.error('Error al crear el like:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const removeLike = async (req, res) => {
    const { posts_id, users_id } = req.body; // Asegúrate de que los nombres de los campos coincidan con los nombres en tu modelo de datos
    try {
        // Buscar y eliminar el like
        const deletedLike = await likesModels.findOneAndDelete({ posts_id: posts_id, users_id: users_id });
        if (!deletedLike) {
            return res.status(400).json({ error: 'El usuario no ha dado like a este post' });
        }

        // Disminuir el contador de likes en el post
        await PostModel.findByIdAndUpdate(posts_id, { $inc: { likesCount: -1 } });

        return res.status(200).json({ message: 'Like eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el like:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const checkIsLiked = async (req, res) => {
    const { posts_id, users_id } = req.body;
    try {
        // Buscar el like correspondiente
        const like = await likesModels.findOne({ posts_id: posts_id, users_id: users_id });
        if (!like) {
            // Si no se encuentra el like, el usuario no ha dado like a este post
            return res.status(200).json({ isLiked: false });
        }
        // Si se encuentra el like, verificar si isLiked es true
        if (like.isLiked) {
            return res.status(200).json({ isLiked: true });
        } else {
            return res.status(200).json({ isLiked: false });
        }
    } catch (error) {
        console.error('Error al verificar isLiked:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const totalLikes = async (req, res) => {
    try {
        const postId = req.params.posts_id;
        const totalLikes = await likesModels.countDocuments({ posts_id: postId, isLiked: true });

        if (totalLikes > 0) {
            // Se encontraron documentos con isLiked=true para el posts_id especificado
            res.status(200).json({ totalLikes });
        } else {
            // No se encontraron documentos con isLiked=true para el posts_id especificado
            res.status(200).json({ totalLikes: 0 });
        }
    } catch (error) {
        console.error("Error al contar los likes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

