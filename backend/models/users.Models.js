
const mongoose = require('mongoose')
const userShema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'el nombre es requerido']
  },
  email: {
    type: String,
    required: [true, 'el correo es requerido']
  },
  password: {
    type: String,
    required: [true, 'la contraseña es requerida']
  }
},{
  timestamps: true
})
module.exports = mongoose.model('User', userShema)