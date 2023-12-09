const asyncHandler = require('express-async-handler');
const Movie = require('../models/peliculasModel');

// Obtener todas las películas
const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find();
    res.status(200).json(movies);
});

// Crear una nueva película
const createMovie = asyncHandler(async (req, res) => {
    const {
        title,
        director,
        releaseYear,
        likes,
        adult,
        backdrop_path,
        genre_ids,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        video,
        vote_average,
        vote_count
    } = req.body;

    if (!title || !director || !releaseYear) {
        res.status(400).json({ message: 'Por favor completa los campos obligatorios' });
        return;
    }

    const movie = await Movie.create({
        title,
        director,
        releaseYear,
        likes: likes || 0,
        adult,
        backdrop_path,
        genre_ids,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        video,
        vote_average,
        vote_count
    });

    res.status(201).json(movie);
});

// Actualizar una película existente
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404).json({ message: 'La película no fue encontrada' });
        return;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedMovie);
});

// Eliminar una película
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404).json({ message: 'La película no fue encontrada' });
        return;
    }

    await movie.remove();
    res.status(200).json({ id: req.params.id });
});

// Incrementar los 'likes' de una película
const incrementLikes = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404).json({ message: 'La película no fue encontrada' });
        return;
    }

    movie.likes = (movie.likes || 0) + 1;
    await movie.save();

    res.status(200).json(movie);
});

module.exports = {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    incrementLikes
};
