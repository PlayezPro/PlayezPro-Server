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

export const checkRelation = async (req,res) =>{
    const {userfollow,userfollower} = req.body
    try {
        
        const relation = await followModel.findOne({userfollow,userfollower});
        if(!relation){
            return res.status(200).json({ inRelation: false });
        }else {
            return res.status(200).json({inRelation: relation.isRelation})
        }
    } catch (error) {
        console.error('Error al verificar la relacion:', error);
        return res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
    }
}

export const deleteRelation = async (req,res) =>{
        const {userfollow,userfollower} = req.body
        try {
            const blockRelation = await followModel.findOneAndDelete({userfollow,userfollower})
            if (!blockRelation) {
                return res.status(400).json({ error: 'No existe relación' });
            }
            return res.status(200).json({ message: 'Relación eliminado correctamente' });
        } catch (error) {
            return res.status(500).json({ error: 'No se pudo eliminar la relación' });
        }    
}
