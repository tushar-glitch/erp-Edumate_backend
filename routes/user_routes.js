const express = require('express')
const userController = require('../controllers/userController')
const route = express.Router()

route.post('/login',userController.userLogin)
route.post('/sendotp',userController.sendotp)
route.post('/verifyotp',userController.verifyotp)
route.post('/changepass',userController.changepass)

module.exports = route