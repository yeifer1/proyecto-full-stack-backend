const mongoose = require('mongoose');

// Definir el esquema para el modelo de usuarios
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // El correo electrónico debe ser único
  },
  password: {
    type: String,
    required: true,
  },
  // Puedes agregar otros campos según tus necesidades
});

// Crear el modelo de usuarios a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
