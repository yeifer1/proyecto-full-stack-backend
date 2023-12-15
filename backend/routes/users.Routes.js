const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../controllers/users.Controllers')
const { protect } = require('../middleware/auth.Middleware')
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
module.exports = router