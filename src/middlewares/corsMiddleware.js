import cors from 'cors';

// Lista de orígenes permitidos
const allowedOrigins = [
    'http://localhost:4200',
    'https://playezpro-client.netlify.app/',
    'https://playezpro-server.onrender.com',
];

const corsOptions = {
    origin: (origin, callback) => {
        // Log para registrar la solicitud
        console.log('--- Nueva Solicitud ---');
        console.log(`Origen de la solicitud: ${origin}`);
        console.log('Cabeceras de la solicitud:', JSON.stringify(this.headers, null, 2));
        
        // Verificación del origen
        if (!origin || allowedOrigins.includes(origin)) {
            console.log('Origen permitido por CORS');
            callback(null, true);
        } else {
            // Log detallado para orígenes no permitidos
            console.log('--- Origen no permitido por CORS ---');
            console.log(`Origen de la solicitud no permitido: ${origin}`);
            console.log('Cabeceras de la solicitud:', JSON.stringify(this.headers, null, 2));
            console.log('Ruta solicitada:', this.path);
            console.log('Método HTTP:', this.method);
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;