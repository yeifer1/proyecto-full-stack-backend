const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa cors

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para CORS
app.use(cors());

// Conecta a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Error de conexión a la base de datos:', error));
db.once('open', () => console.log('Conexión exitosa a la base de datos'));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Configura las rutas de tu aplicación
const movieRoutes = require('./routes/peliculasRoutes');
const userRoutes = require('./routes/usersRoutes');

app.use('/api', movieRoutes);
app.use('/api', userRoutes);

// Middleware de manejo de errores (debe ir al final)
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
