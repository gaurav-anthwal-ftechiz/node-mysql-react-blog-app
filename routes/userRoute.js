const router = require('express').Router()
const {loginUser, registerUser} = require('../controllers/userController')


// login user
router.post('/login', loginUser)

//register user
router.post('/register', registerUser)

module.exports = router;