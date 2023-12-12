const asyncHandler = require('express-async-handler');
const Movie = require('../models/peliculasModel');

// Obtener una película por su ID
const getMovieById = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404).json({ message: 'La película no fue encontrada' });
        return;
    }

    res.status(200).json(movie);
});

// Obtener todas las películas
const getMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las películas' });
    }
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

const deleteMovie = asyncHandler(async (req, res) => {
    try {
        const result = await Movie.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'La película no fue encontrada' });
        }

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la película' });
    }
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
    getMovieById, // Agrega esta línea
    createMovie,
    updateMovie,
    deleteMovie,
    incrementLikes
};
