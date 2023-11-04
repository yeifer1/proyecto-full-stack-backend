// Middleware de manejo de errores
function errorMiddleware(err, req, res, next) {
  console.error(err.stack);

  // Puedes personalizar el manejo de errores aquí
  // Por ejemplo, puedes verificar el tipo de error y proporcionar una respuesta adecuada

  res.status(500).json({ msg: 'Error interno del servidor' });
}

module.exports = errorMiddleware;
