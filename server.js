const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler } = require('./backend/middleware/errorMiddleware');
const connectDB = require('./backend/config/db');

// Conexión a la base de datos
connectDB();

const app = express();

// Configuración de seguridad básica con Helmet
app.use(helmet());

// Configuración de CORS para desarrollo y producción
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://tu-dominio-frontend.com' : '*',
};
app.use(cors(corsOptions));

// Middleware para parsear JSON y urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/movies', require('./backend/routes/movies.Routes'));
app.use('/api/users', require('./backend/routes/users.Routes'));

// Manejador de errores personalizado
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Conectado al puerto ${port}`.yellow.bold));
