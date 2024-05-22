import followModel from '../models/follow.js';

// Controlador para agregar una relación entre seguidores y seguidos
export const addRelation = async (req, res) => {
    try {
        // Extraer los IDs de los usuarios que están siguiendo y siendo seguidos del cuerpo de la solicitud
        const { userfollow, userfollower } = req.body;

        // Crear una nueva instancia de la relación de usuarios con los IDs proporcionados
        const newRelation = new followModel({ userfollow, userfollower });

        // Guardar la nueva relación en la base de datos
        await newRelation.save();

        // Enviar una respuesta de éxito
        res.status(201).json({ message: 'Relación agregada con éxito' });
    } catch (error) {
        // Manejar cualquier error que ocurra durante el proceso
        console.error('Error al agregar relación:', error);
        res.status(500).json({ message: 'Error al agregar relación' });
    }
};

