import likesModels from "../models/likes.js";
import notificationModel from "../models/notification.js";
import postModel from "../models/post.js"; // Asegúrate de tener este modelo


export const createLike = async (req, res) => {
    const { posts_id, users_id } = req.body;
    try {
        
        const existingLike = await likesModels.findOne({ posts_id, users_id });
        if (existingLike) {
            return res.status(400).json({ error: 'El usuario ya ha dado like a este post' });
        }

        const newLike = new likesModels({ posts_id, users_id, isLiked: true });
        await newLike.save();

        // Crear la notificación
        const post = await postModel.findById(posts_id).populate('author');
        if (!post) {
            console.error('Post no encontrado');
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        const notificationMessage = `El usuario ${users_id} le dio like a tu post.`;
        const newNotification = new notificationModel({
            recipient: post.author._id,
            post: posts_id,
            sender: users_id,
            message: notificationMessage
        });


        await newNotification.save();

        return res.status(200).json({ message: 'Like añadido correctamente'});
    } catch (error) {
        console.error('Error al crear el like:');
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};

export const getUserNotifications = async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });
        return res.status(200).json(notifications);
    } catch (error) {
        console.error('Error al obtener las notificaciones:');
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
        console.error('Error al eliminar el like:');
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
        console.error('Error al verificar isLiked:');
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};
export const totalLikes = async (req, res) => {
    const { posts_id } = req.params;
    try {
        const totalLikes = await likesModels.countDocuments({ posts_id, isLiked: true });
        return res.status(200).json({ totalLikes });
    } catch (error) {
        console.error("Error al contar los likes:");
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
        console.error('Error al obtener el ranking de posts:');
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
};
