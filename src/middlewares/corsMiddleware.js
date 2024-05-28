import cors from 'cors';

// Lista de orígenes permitidos
const allowedOrigins = [
    'http://localhost:4200',
    'https://playezpro-client.netlify.app/',
    'https://playezpro-server.onrender.com',
    'https://playezpro-server.onrender.com/auth',
    'https://playezpro-server.onrender.com/auth/signup',
    'https://playezpro-server.onrender.com/auth/signin',

];

const corsOptions = {
    origin: (origin, callback) => {
        // Log para registrar la solicitud
        console.log('--- Nueva Solicitud ---');
        console.log(`Origen de la solicitud: ${origin}`);
        
        // Verificación del origen
        if (!origin || allowedOrigins.includes(origin)) {
            console.log('Origen permitido por CORS');
            callback(null, true);
        } else {
            // Log detallado para orígenes no permitidos
            console.log('--- Origen no permitido por CORS ---');
            console.log(`Origen de la solicitud no permitido: ${origin}`);
            console.log('Ruta solicitada:', origin);
            console.log('Método HTTP:', 'OPTIONS');
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
