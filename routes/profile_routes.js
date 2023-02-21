const express = require('express')
const profileController = require('../controllers/profileController')
const userController = require('../controllers/userController')
const route = express.Router()

route.get('/profiledetails',profileController.getprofile)

module.exports = route