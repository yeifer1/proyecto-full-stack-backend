const mongoose = require('mongoose')
const movieShema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'el usuario es requerido']
  },
  title: {
    type: String,
    required: [true, 'el nombre es requerido']
  },
  original_language:
  {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: [true, 'la descripcion es requerida']
  },
  image: {
    type: String,
    required: true
  },
  popularity:{
    type: String,
    required: true
  },
  release_date:{
    type: String,
    required: true
  }
},{
  timestamps: true
})
module.exports = mongoose.model('Movie', movieShema)














