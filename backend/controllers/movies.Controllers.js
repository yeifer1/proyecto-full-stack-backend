const asyncHandler = require('express-async-handler')
const Movie = require('../models/movies.Models')
const getMovies = asyncHandler( async (req, res) => {
  const NumeroEntradas = await Movie.countDocuments()
  const movies = await Movie.find({user: req.user.id})
  res.status(200).json({
    results : NumeroEntradas,
    movies
  })
})
const getAllMovieId = asyncHandler( async(req, res) => {
  const movie = await Movie.findById(req.params.id)
  if(!movie){
    return res.status(404).json({message:'The movie with the given ID was not found.'})
  }
    res.status(200).json(movie)
})
const postMovies = asyncHandler( async (req, res) => {
  const { title, original_language, description, image, popularity, release_date } = (req.body)
  if( !title || !original_language || !description || !image || !popularity || !release_date ) {
    res.status(400)
      throw new Error ('faltan datos')
  }
  const movie = await Movie.create({
    title,
    original_language,
    description,
    image,
    popularity,
    release_date,
    user: req.user.id
  })
  res.status(201).json(movie)
})
const putMovies = asyncHandler( async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if(!movie) {
    res.status(404)
    throw new Error('la pelicula no se encontro')
  }
  //verificar que la movie pertenesca al usuario logiado
  if(movie.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('no tienes permiso para actualizar esta pelicula')
  } else {
    const putMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true } )
    res.status(200).json(putMovie)
  }
})
const deleteMovies = asyncHandler( async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if(!movie) {
    res.status(404)
    throw new Error('la pelicula no se encontro')
  }
  if(movie.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('no tienes permiso para actualizar esta pelicula')
  } else {
    const deleteMovies = await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json({id: movie._id})
  }
})
module.exports = {
  getMovies,
  getAllMovieId,
  postMovies,
  putMovies,
  deleteMovies
}