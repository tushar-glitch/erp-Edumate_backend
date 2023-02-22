const express = require('express')
const attendanceController = require('../controllers/attendanceController')
const userController = require('../controllers/userController')
const route = express.Router()

route.get('/overallattendance',attendanceController.overallattendance)

module.exports = route