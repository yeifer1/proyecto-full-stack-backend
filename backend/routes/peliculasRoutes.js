const express = require('express');
const router = express.Router();
const movieController = require('../controllers/peliculasControllers');
const { protect } = require('../middleware/authMiddleware')
//const authenticate = require('../middleware/authMiddleware');

// Ruta para crear una nueva película
router.post('/movies',protect, movieController.createMovie);

// Ruta para obtener todas las películas
router.get('/movies', protect, movieController.getMovies);

// Ruta para obtener una película por su ID
router.get('/movies/:id', protect, movieController.getMovieById); // Esta es la ruta correcta para obtener una película por ID

// Ruta para actualizar una película por su ID
router.put('/movies/:id', protect, movieController.updateMovie);

// Ruta para eliminar una película por su ID
router.delete('/movies/:id',protect, movieController.deleteMovie);

// Ruta para incrementar los 'likes' de una película por su ID
router.patch('/movies/:id/like', protect, movieController.incrementLikes);

module.exports = router; 
