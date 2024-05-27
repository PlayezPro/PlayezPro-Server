import cors from 'cors';

// Lista de orígenes permitidos
const allowedOrigins = [
    // 'https://playezpro-client.pages.io', 
    'http://localhost:4200/',
    'https://playezpro-server.onrender.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
