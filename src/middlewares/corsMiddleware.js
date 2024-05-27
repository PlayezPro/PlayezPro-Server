import cors from 'cors';

// Lista de orígenes permitidos
const allowedOrigins = [
    // 'https://playezpro-client.pages.io', 
    //sustituir cuando deploy
    //Frontend
    'http://localhost:4200/',
    'http://localhost:4200/auh/signin',
    'http://localhost:4200/auth/signup',
    'http://localhost:4200/user',
    'http://localhost:4200/likes',
    'http://localhost:4200/post',
    'http://localhost:4200/skill',
    'http://localhost:4200/follow',
    'http://localhost:4200/comment',
    'http://localhost:4200/detail',
    //Backend
    'https://playezpro-server.onrender.com',
    'https://playezpro-server.onrender.com/auth/signup',
    'https://playezpro-server.onrender.com/auth/signin',
    'https://playezpro-server.onrender.com/user',
    'https://playezpro-server.onrender.com/likes',
    'https://playezpro-server.onrender.com/posts',
    'https://playezpro-server.onrender.com/skill',
    'https://playezpro-server.onrender.com/follow',
    'https://playezpro-server.onrender.com/comment',
    'https://playezpro-server.onrender.com/details',
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
