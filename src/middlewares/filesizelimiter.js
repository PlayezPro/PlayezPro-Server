// Middleware para manejar la carga de archivos
const fileSizeLimiter = async (req, res, next) => {
 try {
    const fileSize = parseInt(req.headers['content-length']);
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (fileSize> maxSize) {
      return res.status(400).send('El archivo no debe superar los 2Mb');
    }
    next();
 } catch (error) {
    console.error('Error al obtener el tamaño del archivo', error);
    return res.status(500).send('Error interno del sistema');
 }
};

export default fileSizeLimiter;
