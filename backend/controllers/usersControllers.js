const User = require('../models/usersModel');

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para autenticar un usuario
exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send('Credenciales inválidas');
    }
    // Aquí puedes generar un token de autenticación si es necesario
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para obtener un usuario por su ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).send('Usuario eliminado');
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};
