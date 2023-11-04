const jwt = require('jsonwebtoken');

// Middleware de autenticación
function authenticate(req, res, next) {
  // Obtener el token de la solicitud
  const token = req.header('x-auth-token');

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado. No se proporcionó un token de autenticación.' });
  }

  try {
    // Verificar el token y descifrar la información del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar la información del usuario a la solicitud para su uso posterior
    req.user = decoded.user;

    // Continuar con la ejecución de la solicitud
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token de autenticación no válido.' });
  }
}

module.exports = authenticate;
