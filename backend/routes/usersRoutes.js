const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const authenticate = require('../middleware/authMiddleware');

// Ruta para registrar un nuevo usuario
router.post('/users/register', usersController.createUser); // Cambiado a createUser

// Ruta para autenticar un usuario
router.post('/users/login', usersController.authenticateUser); // Cambiado a authenticateUser

// Ruta para obtener información de un usuario por su ID
router.get('/users/:id', authenticate, usersController.getUser);

// Ruta para actualizar un usuario por su ID
router.put('/users/:id', authenticate, usersController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/users/:id', authenticate, usersController.deleteUser);

module.exports = router;
