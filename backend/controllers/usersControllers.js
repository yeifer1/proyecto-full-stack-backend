const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'tu_jwt_secret'; // Guarda tu secreto en una variable de entorno

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    user.password = undefined; // No enviar la contraseña, incluso encriptada
    res.status(201).json(user);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Credenciales inválidas');
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error al autenticar al usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};

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
