import likesModels from "../models/likes.js";

export const createLike = async (req, res) => {
    const { posts_id, users_id } = req.body;
    try {
        // Comprobar si ya existe un like para este usuario y este post
        const existingLike = await likesModels.findOne({ posts_id, users_id });
        if (existingLike) {
            return res.status(400).json({ error: 'El usuario ya ha dado like a este post' });
        }

        // Crear el nuevo like
        const newLike = new likesModels({ posts_id, users_id, isLiked: true });
        await newLike.save();

        // Incrementar el contador de likes en el post
        // await postModel.findByIdAndUpdate(posts_id, { $inc: { likesCount: 1 } });

        return res.status(200).json({ message: 'Like añadido correctamente', newLike });
    } catch (error) {
        console.error('Error al crear el like:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const removeLike = async (req, res) => {
    const { posts_id, users_id } = req.body;
    try {
        // Buscar y eliminar el like
        const deletedLike = await likesModels.findOneAndDelete({ posts_id, users_id });
        if (!deletedLike) {
            return res.status(400).json({ error: 'El usuario no ha dado like a este post' });
        }

        // Disminuir el contador de likes en el post
        // await postModel.findByIdAndUpdate(posts_id, { $inc: { likesCount: -1 } });

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
        const like = await likesModels.findOne({ posts_id, users_id });
        if (!like) {
            return res.status(200).json({ isLiked: false });
        }
        return res.status(200).json({ isLiked: like.isLiked });
    } catch (error) {
        console.error('Error al verificar isLiked:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const totalLikes = async (req, res) => {
    const { posts_id } = req.params;
    try {
        const totalLikes = await likesModels.countDocuments({ posts_id, isLiked: true });
        return res.status(200).json({ totalLikes });
    } catch (error) {
        console.error("Error al contar los likes:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getPostRanking = async (req, res) => {
    try {
        const ranking = await likesModels.aggregate([
            // Filtrar solo los likes activos
            { $match: { isLiked: true } },
            // Agrupar por post y contar los likes
            { $group: { _id: "$posts_id", totalLikes: { $sum: 1 } } },
            // Ordenar los resultados por número de likes, de mayor a menor
            { $sort: { totalLikes: -1 } },
            // Limitar los resultados si es necesario (por ejemplo, top 10)
            { $limit: 10 },
            // Opcional: Unir con la colección de posts para obtener detalles adicionales del post
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'postDetails'
                }
            },
            // Desenrollar el array de postDetails para facilitar el acceso a los campos
            { $unwind: "$postDetails" }
        ]);

        return res.status(200).json({ ranking });
    } catch (error) {
        console.error('Error al obtener el ranking de posts:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};
