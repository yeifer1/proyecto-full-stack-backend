const express = require('express');
const router = express.Router();
const movieController = require('../controllers/peliculasControllers');
//const authenticate = require('../middleware/authMiddleware');

// Ruta para crear una nueva película
router.post('/movies', movieController.createMovie);

// Ruta para obtener todas las películas
router.get('/movies', movieController.getMovies);

// Ruta para obtener una película por su ID
router.get('/movies/:id', movieController.getMovies);

// Ruta para actualizar una película por su ID
router.put('/movies/:id', movieController.updateMovie);

// Ruta para eliminar una película por su ID
router.delete('/movies/:id', movieController.deleteMovie);


module.exports = router;
