import path from 'path';
import { memory } from './uploadMedia.js';

const allowedVideoFormats = [
  'mp4',
  '3gpp',
  'mpeg',
  'mov',
  'webm',
  'mkv'
];

const videoLimiter = async (req, res, next) => {
   try {
     await memory.single('file')(req, res, async (err) => {
       if (err) {
         console.error('Error al cargar el archivo en memoria:', err);
         return res.status(500).json({ message: 'Error al cargar el archivo en memoria' });
       }
 
       const file = req.file;
 
       // Verificar si se proporcionó el archivo
       if (!file) {
         return res.status(400).send('Archivo no proporcionado');
       }
 
       // Verificar la extensión del archivo
       const fileExtension = path.extname(file.originalname).slice(1);
       if (!allowedVideoFormats.includes(fileExtension)) {
         return res.status(400).json({ message: 'Solo se permiter archivos de tipo video' });
       }
 
       // Verificar el tamaño del archivo
       const maxSize = 10 * 1024 * 1024; // 20MB
       if (file.size > maxSize) {
         return res.status(400).json({ message: 'El archivo no debe superar los 10MB' });
       }
       // Si todo está bien, continuar con el siguiente middleware
       next();
     });
   } catch (error) {
     console.error('Error en el middleware videoLimiter:', error);
     return res.status(500).json({ message: 'Error interno del sistema' });
   }
 };
 
export default videoLimiter;


