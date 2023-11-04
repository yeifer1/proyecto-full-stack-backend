const mongoose = require('mongoose');

// Definir el esquema para la colección de películas
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  adult: {
    type: Boolean,
    required: true,
  },
  backdrop_path: String,
  genre_ids: [Number],
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
}, {
  timestamps: true, // Agrega marcas de tiempo (createdAt, updatedAt) automáticamente
});

// Crear el modelo de películas a partir del esquema definido
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
