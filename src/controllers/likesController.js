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
