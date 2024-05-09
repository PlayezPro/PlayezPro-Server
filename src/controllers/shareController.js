import shareModels from "../models/share.js";
import PostModel from "../models/post.js";

export const sharedPost = async (req, res) => {
    const { posts_id, users_id } = req.body; // Asegúrate de que los nombres de los campos coincidan con los nombres en tu modelo de datos
    try {

        await shareModels.findOne({ posts_id: posts_id, users_id: users_id });
        // if (existingShare) {
        //     return res.status(400).json({ error: 'El ' });
        // }


        const newShare = new shareModels({
            posts_id: posts_id,
            users_id: users_id
        });
        await newShare.save();

        // Incrementar el contador de likes en el post
        await PostModel.findByIdAndUpdate(posts_id, { $inc: { shareCount: 1 } });

        return res.status(200).json({ message: 'Shared', newShare });
    } catch (error) {
        console.error('Sharing error:', error);
        return res.status(500).json({ error: 'Link sharing error' });
    }
};

