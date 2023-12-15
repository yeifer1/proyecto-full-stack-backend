const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { body, validationResult } = require('express-validator');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('common'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Error de conexión a la base de datos:', error));
db.once('open', () => console.log('Conexión exitosa a la base de datos'));

app.use(express.json());

// Rutas de Películas y Usuarios
const movieRoutes = require('./routes/peliculasRoutes');
const userRoutes = require('./routes/usersRoutes');

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

// Manejo de errores
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
