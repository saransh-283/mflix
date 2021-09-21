const express = require('express')
const usersController = require('./controllers.js')

const usersRouter = express.Router()

usersRouter.route('/users')
    .get(usersController.apiGetUser)
    .post(usersController.apiPostuser)
    .delete(usersController.apiDeleteUser)

module.exports = usersRouter